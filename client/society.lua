
RegisterNetEvent("esx_inventoryhud:openSocietyInventory")
AddEventHandler("esx_inventoryhud:openSocietyInventory",function(inventory)
    setSocietyInventoryData(inventory)
    openSocietyInventory()
end)

RegisterNetEvent("esx_inventoryhud:refreshSocietyInventory")
AddEventHandler("esx_inventoryhud:refreshSocietyInventory",function(inventory)
    setSocietyInventoryData(inventory)
end)

function setSocietyInventoryData(inventory)
    SendNUIMessage(
        {
            action = "setInfoText",
            text = 'Kho đồ Gang'
        }
    )

    items = {}

    if inventory ~= nil then
        for key, value in pairs(inventory) do
            local ItemData = {
                label = key,
                type = "item_standard",
                name  = key,
                usable = false,
                rare = false,
                limit = -1,
                canRemove = false,
                count = value
            }
            table.insert(items, ItemData)
        end
    end

    SendNUIMessage(
        {
            action = "setSecondInventoryItems",
            itemList = items
        }
    )
end

function openSocietyInventory()
    loadPlayerInventory()
    isInInventory = true
    TransitionToBlurred(1000)
    SendNUIMessage(
        {
            action = "display",
            type = "Society"
        }
    )

    SetNuiFocus(true, true)
end

RegisterNUICallback("PutIntoSociety",function(data, cb)
    if IsPedSittingInAnyVehicle(playerPed) then
        return
    end
    if tonumber(data.number) < 0 then
        return
    end
    if type(data.number) == "number" and math.floor(data.number) == data.number then
        local count = tonumber(data.number)

        if data.item.name ~= 'money' and data.item.name ~= 'bank' and data.item.type ~= "item_weapon" then

            TriggerSeverEvent("gang_system:putItem", {itemName = data.item.name, count = tonumber(data.number)})
        else
            ESX.ShowNotification('Vật phẩm này không thể bỏ vào kho')
        end
    end

    Wait(250)
    loadPlayerInventory()

    cb("ok")
end)

RegisterNUICallback("TakeFromSociety",function(data, cb)
    if IsPedSittingInAnyVehicle(playerPed) then
        return
    end
    if tonumber(data.number) < 0 then
        return
    end

    if type(data.number) == "number" and math.floor(data.number) == data.number then

        TriggerSeverEvent("gang_system:getItem",  {itemName = data.item.name, count = tonumber(data.number)})
    end

    Wait(250)
    loadPlayerInventory()
    cb("ok")
end)
