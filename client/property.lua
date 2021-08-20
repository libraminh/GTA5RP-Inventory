local isPlayerSafe = false
local isMotel = false

RegisterNetEvent("esx_inventoryhud:openPropertyInventory")
AddEventHandler("esx_inventoryhud:openPropertyInventory", function(data, playerSafe, playerMotel)
    if playerSafe then isPlayerSafe = playerSafe; else isPlayerSafe = false; end
    if playerMotel then isMotel = playerMotel; else isMotel = false; end
    setPropertyInventoryData(data)
    openPropertyInventory()
end)

function refreshPropertyInventory()
    if isPlayerSafe then
        ESX.TriggerServerCallback('playersafes:GetSafeInventory', function(inventory) 
            setPropertyInventoryData(inventory); 
        end, isPlayerSafe.safeid)
    elseif isMotel then
        ESX.TriggerServerCallback('motels:getInventory', function(inventory) 
            setPropertyInventoryData(inventory); 
        end,isMotel.zone,isMotel.door)
    else
        ESX.TriggerServerCallback("esx_property:getPropertyInventory",function(inventory)
            setPropertyInventoryData(inventory)
        end,ESX.GetPlayerData().identifier)
    end
end

function setPropertyInventoryData(data)
    items = {}

    local blackMoney = data.blackMoney
    local propertyItems = data.items
    local propertyWeapons = data.weapons

    if blackMoney > 0 then
        accountData = {
            label = _U("black_money"),
            count = blackMoney,
            type = "item_account",
            name = "black_money",
            usable = false,
            rare = false,
            limit = -1,
            canRemove = false
        }
        table.insert(items, accountData)
    end

    for k,v in  pairs(propertyItems) do
        local item = v
        if item.count > 0 then            
            item.type = "item_standard"
            item.usable = false
            item.rare = false
            item.limit = -1
            item.canRemove = false
            table.insert(items, item)
        end
    end

    -- for i = 1, #propertyWeapons, 1 do
    --     local weapon = propertyWeapons[i]
    --     if propertyWeapons[i].name ~= "WEAPON_UNARMED" then
    --         table.insert(
    --             items,
    --             {
    --                 label = ESX.GetWeaponLabel(weapon.name),
    --                 count = weapon.ammo,
    --                 limit = -1,
    --                 type = "item_weapon",
    --                 name = weapon.name,
    --                 usable = false,
    --                 rare = false,
    --                 canRemove = false
    --             }
    --         )
    --     end
    -- end

    SendNUIMessage(
        {
            action = "setSecondInventoryItems",
            itemList = items
        }
    )
end

function openPropertyInventory()
    loadPlayerInventory()
    isInInventory = true

    SendNUIMessage(
        {
            action = "display",
            type = "property"
        }
    )

    SetNuiFocus(true, true)
end

RegisterNUICallback(
    "PutIntoProperty",
    function(data, cb) 
        if IsPedSittingInAnyVehicle(PlayerPedId()) then
            return
        end
        if tonumber(data.number) < 0 then
            return
        end
        if type(data.number) == "number" and math.floor(data.number) == data.number then
            local count = tonumber(data.number)
            local isWeapon = false
            if data.item.type == "item_weapon" then
                ESX.ShowNotification('Không thể cất vũ khí vào kho đồ')
                return
            end

            if isPlayerSafe then        
                print(ESX.GetPlayerData().identifier, data.item.type, data.item.name, count, isPlayerSafe.safeid, isWeapon)
                TriggerSeverEvent("playersafes:PutItem", ESX.GetPlayerData().identifier, data.item.type, data.item.name, count, isPlayerSafe.safeid, isWeapon)
            end
        end

        Wait(150)
        refreshPropertyInventory()
        Wait(150)
        loadPlayerInventory()

        cb("ok")
    end
)

RegisterNUICallback("TakeFromProperty", function(data, cb)
        if IsPedSittingInAnyVehicle(PlayerPedId()) then
            return
        end
        if tonumber(data.number) < 0 then
            return
        end
        if type(data.number) == "number" and math.floor(data.number) == data.number then
            if isPlayerSafe then
                TriggerSeverEvent("playersafes:GetItem", ESX.GetPlayerData().identifier, data.item.type, data.item.name, tonumber(data.number), isPlayerSafe.safeid)
            elseif isMotel then
                TriggerSeverEvent("motels:getItem", ESX.GetPlayerData().identifier, data.item.type, data.item.name, tonumber(data.number), isMotel.zone, isMotel.door)                
            else
                TriggerSeverEvent("esx_property:getItem", ESX.GetPlayerData().identifier, data.item.type, data.item.name, tonumber(data.number))
            end
        end

        Wait(150)
        refreshPropertyInventory()
        Wait(150)
        loadPlayerInventory()

        cb("ok")
    end
)
