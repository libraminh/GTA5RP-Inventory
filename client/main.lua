local Keys = {
    ["ESC"] = 322,
    ["F1"] = 288,
    ["F2"] = 289,
    ["F3"] = 170,
    ["F5"] = 166,
    ["F6"] = 167,
    ["F7"] = 168,
    ["F8"] = 169,
    ["F9"] = 56,
    ["F10"] = 57,
    ["~"] = 243,
    ["1"] = 157,
    ["2"] = 158,
    ["3"] = 160,
    ["4"] = 164,
    ["5"] = 165,
    ["6"] = 159,
    ["7"] = 161,
    ["8"] = 162,
    ["9"] = 163,
    ["-"] = 84,
    ["="] = 83,
    ["BACKSPACE"] = 177,
    ["TAB"] = 37,
    ["Q"] = 44,
    ["W"] = 32,
    ["E"] = 38,
    ["R"] = 45,
    ["T"] = 245,
    ["Y"] = 246,
    ["U"] = 303,
    ["P"] = 199,
    ["["] = 39,
    ["]"] = 40,
    ["ENTER"] = 18,
    ["CAPS"] = 137,
    ["A"] = 34,
    ["S"] = 8,
    ["D"] = 9,
    ["F"] = 23,
    ["G"] = 47,
    ["H"] = 74,
    ["K"] = 311,
    ["L"] = 182,
    ["LEFTSHIFT"] = 21,
    ["Z"] = 20,
    ["X"] = 73,
    ["C"] = 26,
    ["V"] = 0,
    ["B"] = 29,
    ["N"] = 249,
    ["M"] = 244,
    [","] = 82,
    ["."] = 81,
    ["LEFTCTRL"] = 36,
    ["LEFTALT"] = 19,
    ["SPACE"] = 22,
    ["RIGHTCTRL"] = 70,
    ["HOME"] = 213,
    ["PAGEUP"] = 10,
    ["PAGEDOWN"] = 11,
    ["DELETE"] = 178,
    ["LEFT"] = 174,
    ["RIGHT"] = 175,
    ["TOP"] = 27,
    ["DOWN"] = 173,
    ["NENTER"] = 201,
    ["N4"] = 108,
    ["N5"] = 60,
    ["N6"] = 107,
    ["N+"] = 96,
    ["N-"] = 97,
    ["N7"] = 117,
    ["N8"] = 61,
    ["N9"] = 118
}
connectedPlayers = {}

isInInventory = false
ESX = nil
local fastWeapons = {
	[1] = nil,
	[2] = nil,
	[3] = nil,
    [4] = nil,
    [5] = nil,
    [6] = nil,
    [7] = nil,
    [8] = nil,
    [9] = nil,
}
local canPlayAnim = true
local fastItemsHotbar = {}
local itemslist ={}
local isHotbar = false


Citizen.CreateThread(
    function()
        while ESX == nil do
            TriggerEvent(
                "esx:getShKaido94aredObjKaido94ect",
                function(obj)
                    ESX = obj
                end
            )
            Citizen.Wait(10)
        end
       
        Citizen.Wait(3000)
        while connectedPlayers == nil do 
            Wait(100)
            connectedPlayers = ESX.GetPLayerData().PlayerConnectedData
        end
	    toghud = true
    end
)
Citizen.CreateThread(function()
    while ESX == nil do
        Citizen.Wait(10)
    end
end)

AddEventHandler('esx:onPlayerDeath', function()
    closeInventory()
end)

RegisterCommand('lagbalo', function()
    closeInventory()
end)

Citizen.CreateThread(function()
    while ESX == nil do
        Citizen.Wait(10)
    end
    local KeysNumber = {
        [1] = 157,
        [2] = 158,
        [3] = 160,
        [4] = 164,
        [5] = 165,
        [6] = 159,
        [7] = 161,
        [8] = 162,
        [9] = 163,
    }
    while true do
        Citizen.Wait(1)
        DisableControlAction(0, 37, true)
        for i = 1, 9 do 
            if  IsDisabledControlJustReleased(1,  KeysNumber[i]) then
                -- showHotbar(true)
                if fastWeapons[i] ~= nil then
                    if fastWeapons[i].type == 'item_standard' then
                        if fastWeapons[i].usable then
                            TriggerSeverEvent("esx:useItem", fastWeapons[i].name)
                        else
                            ESX.ShowNotification('Vật phẩm này không thể sử dụng')
                        end
                    elseif fastWeapons[i].type == 'item_weapon' then
                        if GetSelectedPedWeapon(GetPlayerPed(-1)) == GetHashKey(fastWeapons[i].name) then
                            SetCurrentPedWeapon(GetPlayerPed(-1), GetHashKey('WEAPON_UNARMED'),true)
                        else
                            SetCurrentPedWeapon(GetPlayerPed(-1), GetHashKey(fastWeapons[i].name),true)
                        end
                    end
                end
                -- Citizen.CreateThread(function()
                --     Wait(3000)
                --     showHotbar(false)
                -- end)
                break
            end
        end
        if IsDisabledControlJustPressed(1, Keys ["TAB"])  then
            openInventory()
        -- elseif IsDisabledControlJustPressed(1, Keys ["TAB"]) then
            -- showHotbar(true)
        elseif IsControlJustPressed(0, 202) then
            closeInventory()
        end
    end
end)


function showHotbar(show)
    Citizen.CreateThread(function()
        if not isHotbar then
            isHotbar = true
            loadItems()
            while not ItemsLoaded do
                Wait(100)
            end
            SendNUIMessage({
                action = "showhotbar",
                fastItems = fastItemsHotbar,
                itemList = itemslist,
                showHotBar = show
            })
            Wait(3000)
            isHotbar = false
        end
    end)
end


function loadItems()
    Citizen.CreateThread(function()
        WeightLoaded = false
        ItemsLoaded = false
        local data = ESX.GetPlayerData()
        items = {}
        fastItems = {}
        inventory = data.inventory
        accounts = data.accounts
        money = data.money
        weapons = data.loadout
        weight = data.weight
        maxWeight = data.maxWeight
        if Config.IncludeCash and accounts.money > 0 then
            moneyData = {
                label = _U("cash"),
                name = "cash",
                type = "item_money",
                count = money,
                usable = false,
                rare = false,
                weight = 0,
                canRemove = true
            }
            table.insert(items, moneyData)
        end

        if Config.IncludeAccounts and accounts ~= nil then
            for key, value in pairs(accounts) do
                if not shouldSkipAccount(accounts[key].name) then
                    local canDrop = accounts[key].name ~= "bank"

                    if accounts[key].money > 0 then
                        accountData = {
                            label = accounts[key].label,
                            count = accounts[key].money,
                            type = "item_account",
                            name = accounts[key].name,
                            usable = false,
                            rare = false,
                            weight = 0,
                            canRemove = canDrop
                        }
                        table.insert(items, accountData)
                    end
                end
            end
        end
        if inventory ~= nil then
            for key, value in pairs(inventory) do
                if inventory[key].count <= 0 then
                    inventory[key] = nil
                else
                    inventory[key].type = "item_standard"
                    local founditem = false
                    for slot, item in pairs(fastWeapons) do
                        if item.name == inventory[key].name then
                            table.insert(
                                    fastItems,
                                    {
                                        label = inventory[key].label,
                                        count = inventory[key].count,
                                        weight = 0,
                                        type = "item_standard",
                                        name = inventory[key].name,
                                        usable = inventory[key].usable,
                                        rare = inventory[key].rare,
                                        canRemove = true,
                                        slot = slot
                                    }
                            )
                            founditem = true
                            break
                        end
                    end
                    if founditem == false then
                        table.insert(items, inventory[key])
                    end
                end
            end
        end

        if Config.IncludeWeapons and weapons ~= nil then
            for key, value in pairs(weapons) do
                local weaponHash = GetHashKey(weapons[key].name)
                local playerPed = PlayerPedId()
                if weapons[key].name ~= "WEAPON_UNARMED" then
                    local ammo = GetAmmoInPedWeapon(playerPed, weaponHash)
                    local founditem = false
                    for slot, item in pairs(fastWeapons) do
                        if item.name == weapons[key].name then
                            table.insert(fastItems, {
                                        label = weapons[key].label,
                                        count = ammo,
                                        weight = 0,
                                        type = "item_weapon",
                                        name = weapons[key].name,
                                        usable = false,
                                        rare = false,
                                        canRemove = true,
                                        doben = math.floor(weapons[key].doben)/10,
                                        slot = slot
                                    })
                            founditem = true
                            break
                        end
                    end
                    if founditem == false then
                        table.insert(items, {
                            label = weapons[key].label,
                            count = ammo,
                            weight = 0,
                            type = "item_weapon",
                            name = weapons[key].name,
                            usable = false,
                            rare = false,
                            canRemove = true,
                            doben = math.floor(weapons[key].doben)/10
                        })
                    end
                    
                end
            end
        end
        fastItemsHotbar =  fastItems
        SendNUIMessage(
            {
                action = "setItems",
                itemList = items,
                fastItems = fastItems,
                weight = weight
            }
        )
        SendNUIMessage({
            action = "setWeightText",
            text =  "Trọng lượng: <span style='color: blue;'>"..tostring(ESX.Math.GroupDigits(weight)).."/"..tostring(ESX.Math.GroupDigits(maxWeight)).."G</span> | NGÂN Hàng: <span style='color: green;'>$" ..ESX.Math.GroupDigits(data.bank).."</span> | SAO:⭐<span style='color: yellow;'>"..ESX.Math.GroupDigits(data.star)..'</span>'
        })
        WeightLoaded = true
        ItemsLoaded = true
    end)
end

RegisterNUICallback("UseItem", function(data, cb)
    if data.type == 'item_standard' and data.usable then
        TriggerSeverEvent("esx:useItem", data.name)

        if shouldCloseInventory(data) then
            closeInventory()
        else
            Citizen.Wait(250)
            loadPlayerInventory()
        end
    elseif data.type == 'item_weapon' then
        ESX.ShowNotification('Đây là vũ khí hãy kéo vào phím nhanh để sử dụng')
    else
        ESX.ShowNotification('Vật phẩm này không thể sử dụng')
    end
end)

RegisterCommand('testinv', function()
    print(ESX.DumpTable(ESX.GetPlayerData()))
end)

function openInventory()
    if not IsPlayerDead(PlayerId()) then
        DisplayRadar(false)
        TriggerEvent('esx:setNUI', true)
        isInInventory = true
        SetNuiFocus(true, true)  
        -- TriggerScreenblurFadeIn(1000)
        loadPlayerInventory()
        SendNUIMessage(
            {
                action = "display",
                type = "normal",
            }
        )
    end
end

function closeInventory()
    TriggerEvent('esx:setNUI', false)
    DisplayRadar(true)
    isInInventory = false
    ClearPedSecondaryTask(PlayerPedId())
    SendNUIMessage(
        {
            action = "hide"
        }
    )
    -- TriggerScreenblurFadeOut(1000)
    SetNuiFocus(false, false)
    TriggerEvent('closeinven')
end

function shouldCloseInventory(itemName)
    for index, value in ipairs(Config.CloseUiItems) do
        if value == itemName then
            return true
        end
    end

    return false
end

function shouldSkipAccount(accountName)
    for index, value in ipairs(Config.ExcludeAccountsList) do
        if value == accountName then
            return true
        end
    end

    return false
end

function loadPlayerInventory()
    WeightLoaded = false
    ItemsLoaded = false
    loadItems()
    while not ItemsLoaded or not WeightLoaded do
        Citizen.Wait(1)
    end
end

RegisterNUICallback("NUIFocusOff", function()
    if isInInventory then
        closeInventory()
    end
end)

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function()
    while connectedPlayers == nil do 
		Wait(100)
		connectedPlayers = ESX.GetPLayerData().PlayerConnectedData
	end
end)

RegisterNetEvent('esx_scoreboard:updateConnectedPlayers')
AddEventHandler('esx_scoreboard:updateConnectedPlayers', function(connectedPlayers1)
    connectedPlayers = connectedPlayers1
end)

RegisterNUICallback("GetNearPlayers", function(data, cb)
    local playerPed = PlayerPedId()
    local players, nearbyPlayer = ESX.Game.GetPlayersInArea(GetEntityCoords(playerPed), 5.0)
    local foundPlayers = false
    local elements = {}
    local foundPlayer = false
    for i = 1, #players, 1 do
        if players[i] ~= PlayerId() then
            foundPlayer = true
            local PlayerIdO = GetPlayerServerId(players[i])
            table.insert(elements,
                {
                    label = connectedPlayers[PlayerIdO].name,
                    player = PlayerIdO,
                    idcard = connectedPlayers[PlayerIdO].idcard
                }
            )                
        end
    end
    if foundPlayer then
        SendNUIMessage(
            {
                action = "nearPlayers",
                foundAny = foundPlayers,
                players = elements,
                item = data.item,
                number = data.number
            }
        )
        cb("ok")
    else
        ESX.ShowNotification('Không có ai ở gần bạn')
    end
end)


RegisterNUICallback(
    "DropItem",
    function(data, cb)
       if IsPedSittingInAnyVehicle(playerPed) then
            return
        end

        if type(data.number) == "number" and math.floor(data.number) == data.number then
            TriggerSeverEvent("esx:removeInventoryItem", data.item.type, data.item.name, data.number)
        end

        Wait(250)
        loadPlayerInventory()

        cb("ok")
    end
)

RegisterNUICallback("GiveItem", function(data, cb)
    local count = tonumber(data.number)
    if data.item.type == "item_weapon" then
        count = GetAmmoInPedWeapon(PlayerPedId(), GetHashKey(data.item.name))
    end
    TriggerSeverEvent("esx:giKaido94veInventoryItem", data.player, data.item.type, data.item.name, count, 'KaidoTest')
    Wait(250)
    loadPlayerInventory()
    cb("ok")
end)

RegisterNUICallback("PutIntoFast", function(data, cb)
    if data.item.slot ~= nil then
        fastWeapons[data.item.slot] = nil
    end
    fastWeapons[data.slot] = data.item
    loadPlayerInventory()
    cb("ok")
end)

RegisterNUICallback("TakeFromFast", function(data, cb)
    fastWeapons[data.item.slot] = nil
    if data.item.type == 'item_weapon' and GetSelectedPedWeapon(PlayerPedId()) == GetHashKey(data.item.name) then
        SetCurrentPedWeapon(GetPlayerPed(-1), GetHashKey('WEAPON_UNARMED'),true)
    end
    loadPlayerInventory()
    cb("ok")
end)

RegisterNetEvent('conde-inventoryhud:notification')
AddEventHandler('conde-inventoryhud:notification', function(sourceitemname, sourceitemlabel, sourceitemcount, sourceitemremove)
        SendNUIMessage({
            action = "notification",
            itemname = sourceitemname,
            itemlabel = sourceitemlabel,
            itemcount = sourceitemcount,
            itemremove = sourceitemremove
        })
end)

RegisterNetEvent('conde-inventoryhud:closeinventory')
AddEventHandler('conde-inventoryhud:closeinventory', function()
    closeInventory()
end)

RegisterNetEvent('conde-inventoryhud:clearfastitems')
AddEventHandler('conde-inventoryhud:clearfastitems', function()
    fastWeapons = {
        [1] = nil,
        [2] = nil,
        [3] = nil,
        [4] = nil,
        [5] = nil,
        [6] = nil,
        [7] = nil,
        [8] = nil,
        [9] = nil,
    }
end)

RegisterNetEvent('conde_inventory_inventoryhud:doClose')
AddEventHandler('conde_inventory_inventoryhud:doClose', function(...) 
    closeInventory(...); 
end)


AddEventHandler('onResourceStop', function(ResourceName)
    if ResourceName == GetCurrentResourceName() then
        if isInInventory then
            closeInventory()
        end
    end
end)
