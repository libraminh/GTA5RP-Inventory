local trunkData = nil

RegisterNetEvent("esx_inventoryhud:openTrunkInventory")
AddEventHandler("esx_inventoryhud:openTrunkInventory",function(data, inventory)
    setTrunkInventoryData(data, inventory)
    openTrunkInventory()
end)

RegisterNetEvent("esx_inventoryhud:refreshTrunkInventory")
AddEventHandler("esx_inventoryhud:refreshTrunkInventory",function(data, inventory)
    setTrunkInventoryData(data, inventory)
end)

function setTrunkInventoryData(data, inventory)
    trunkData = data
    SendNUIMessage(
        {
            action = "setInfoText",
            text = data.text,
            trunkData = trunkData,
        }
    )

    items = {}
    if tonumber(inventory.item_account) > 0 then
        accountData = {
            label = 'Tiền bẩn',
            count = tonumber(inventory.item_account),
            type = "item_account",
            name = "black_money",
            usable = false,
            rare = false,
            limit = -1,
            canRemove = false
        }
        table.insert(items, accountData)
    end

    if inventory.item_standard ~= nil then
        for key, value in pairs(inventory.item_standard) do
            if inventory.item_standard[key].count <= 0 then
                inventory.item_standard[key] = nil
            else
                inventory.item_standard[key].type = "item_standard"
                inventory.item_standard[key].usable = false
                inventory.item_standard[key].rare = false
                inventory.item_standard[key].limit = -1
                inventory.item_standard[key].canRemove = false
                table.insert(items, inventory.item_standard[key])
            end
        end
    end

    SendNUIMessage(
        {
            action = "setSecondInventoryItems",
            itemList = items
        }
    )
end

function openTrunkInventory()
    loadPlayerInventory()
    isInInventory = true
    TransitionToBlurred(1000)
    SendNUIMessage(
        {
            action = "display",
            type = "trunk"
        }
    )

    SetNuiFocus(true, true)
end

RegisterNUICallback("PutIntoTrunk",function(data, cb)
    if IsPedSittingInAnyVehicle(playerPed) then
        return
    end
    if tonumber(data.number) < 0 then
        return
    end
    if type(data.number) == "number" and math.floor(data.number) == data.number then
        local count = tonumber(data.number)
        --[[ if data.item.type == "item_weapon" then
            count = GetAmmoInPedWeapon(PlayerPedId(), GetHashKey(data.item.name))
        end ]]
        if data.item.name ~= 'money' and data.item.name ~= 'bank' and data.item.type ~= "item_weapon" then
            TriggerSeverEvent("esx_trunk:putItem", trunkData.plate, data.item.type, data.item.name, tonumber(data.number), tonumber(trunkData.max), trunkData.myVeh, data.item.label)
        else
            ESX.ShowNotification('Vật phẩm này không thể bỏ vào cốp xe')
        end
    end

    Wait(250)
    loadPlayerInventory()

    cb("ok")
end)

RegisterNUICallback("TakeFromTrunk",function(data, cb)
    if IsPedSittingInAnyVehicle(playerPed) then
        return
    end
    if tonumber(data.number) < 0 then
        return
    end
    if type(data.number) == "number" and math.floor(data.number) == data.number then
        TriggerSeverEvent("esx_trunk:getItem", trunkData.plate, data.item.type, data.item.name, tonumber(data.number), trunkData.max, trunkData.myVeh)
    end

    Wait(250)
    loadPlayerInventory()
    cb("ok")
end)
