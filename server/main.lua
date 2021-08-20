ESX = nil
ServerItems = {}
itemShopList = {}
TriggerEvent(
	"esx:getShKaido94aredObjKaido94ect",
	function(obj)
		ESX = obj
	end
)

ESX.RegisterServerCallback("conde_inventory:getPlayerInventory", function(source, cb)
	local targetXPlayer = ESX.GetPlayerFromId(source)
	if targetXPlayer ~= nil then
		cb({inventory = targetXPlayer.inventory, money = targetXPlayer.getMoney(), accounts = targetXPlayer.accounts, weapons = targetXPlayer.loadout, weight = targetXPlayer.getWeight(), maxWeight= targetXPlayer.getMaxWeight()})
	else
		cb(nil)
	end
end)

RegisterNetEvent("conde_inventoryhud:clearweapons")
AddEventHandler("conde_inventoryhud:clearweapons",
function(target)
	TriggerClientEvent('conde-inventoryhud:clearfastitems',target)
end)

ESX.RegisterServerCallback('conde_inventory:takePlayerItem', function(source, cb, item, count)
    local player = ESX.GetPlayerFromId(source)
    local invItem = player.getInventoryItem(item)
    if invItem.count - count < 0 then
        cb(false)
    else
        player.removeInventoryItem(GetCurrentResourceName(), item, count)
        cb(true)
    end
end)

ESX.RegisterServerCallback('tqrp_inventoryhud:addPlayerItem', function(source, cb, item, count)
    local player = ESX.GetPlayerFromId(source)
	if player.canCarryItem(item, count) then
		player.addInventoryItem(GetCurrentResourceName(), item, count)
		cb(true)
	else
		cb(false)
	end
end)

RegisterServerEvent("conde_inventory:tradePlayerItem")
AddEventHandler("conde_inventory:tradePlayerItem", function(from, target, type, itemName, itemCount)
		local _source = from
		local sourceXPlayer = ESX.GetPlayerFromId(_source)
		if tobumber(_source) == tobumber(target) then
			TriggerEvent('BanSql:BanPlayer', _source, _source, '['..sourceXPlayer.idcard..'] Bug tiền nè =)))', true)
		end
		local targetXPlayer = ESX.GetPlayerFromId(target)
		local item = sourceXPlayer.getInventoryItem(itemName)

		if type == "item_standard" then
            if itemCount > 0 and item.count >= itemCount then
                if  targetXPlayer.canCarryItem(itemName, itemCount) then
                    sourceXPlayer.removeInventoryItem(GetCurrentResourceName(), itemName, itemCount)
					targetXPlayer.addInventoryItem(GetCurrentResourceName(), itemName, itemCount)
                else
                    TriggerClientEvent('mythic_notify:client:SendAlert', _source , { type = 'error', text = 'O destinatário não tem espaço no inventário!' })
                end
            end
		elseif type == "item_money" then
			if itemCount > 0 and sourceXPlayer.getMoney() >= itemCount then
				sourceXPlayer.removeMoney(GetCurrentResourceName(), itemCount)
				targetXPlayer.addMoney(GetCurrentResourceName(), itemCount)
			end
		elseif type == "item_account" then
			if itemCount > 0 and sourceXPlayer.getAccount(itemName).money >= itemCount then
				sourceXPlayer.removeAccountMoney(GetCurrentResourceName(), itemName, itemCount)
				targetXPlayer.addAccountMoney(GetCurrentResourceName(), itemName, itemCount)
			end

		elseif type == "item_weapon" then
			if not targetXPlayer.hasWeapon(itemName) then
				sourceXPlayer.removeWeapon(itemName)
				targetXPlayer.addWeapon(itemName, itemCount)
			else
				TriggerClientEvent('mythic_notify:client:SendAlert', _source, { type = 'error', text = 'O destinatário já tem essa arma!' })
			end
		end
	end
)

RegisterCommand(
	"steal",
	function(source)
		local _source = source
		TriggerClientEvent('conde-inventoryhud:steal', _source)
	end
)
RegisterCommand(
		"closeinventory",
		function(source)
			local _source = source
			TriggerClientEvent('conde-inventoryhud:closeinventory', _source)
		end
)
RegisterServerEvent("suku:sendShopItems")
AddEventHandler("suku:sendShopItems", function(source, itemList)
	itemShopList = itemList
end)

ESX.RegisterServerCallback("suku:getShopItems", function(source, cb, shoptype)
	itemShopList = {}
	local itemResult = MySQL.Sync.fetchAll('SELECT * FROM items')
	local itemInformation = {}
	for i=1, #itemResult, 1 do
		if itemInformation[itemResult[i].name] == nil then
			itemInformation[itemResult[i].name] = {}
		end
		itemInformation[itemResult[i].name].name = itemResult[i].name
		itemInformation[itemResult[i].name].label = itemResult[i].label
		itemInformation[itemResult[i].name].weight = itemResult[i].weight
		itemInformation[itemResult[i].name].rare = itemResult[i].rare
		itemInformation[itemResult[i].name].can_remove = itemResult[i].can_remove
		if shoptype == "regular" then
			for _, v in pairs(Config.Shops.RegularShop.Items) do
				if v.name == itemResult[i].name then
					table.insert(itemShopList, {
						type = "item_standard",
						name = itemInformation[itemResult[i].name].name,
						label = itemInformation[itemResult[i].name].label,
						weight = itemInformation[itemResult[i].name].weight,
						rare = itemInformation[itemResult[i].name].rare,
						can_remove = itemInformation[itemResult[i].name].can_remove,
						price = v.price,
						count = 99999999
					})
				end
			end
		end
		if shoptype == "ilegal" then
			for _, v in pairs(Config.Shops.IlegalShop.Items) do
				if v.name == itemResult[i].name then
					table.insert(itemShopList, {
						type = "item_standard",
						name = itemInformation[itemResult[i].name].name,
						label = itemInformation[itemResult[i].name].label,
						weight = itemInformation[itemResult[i].name].weight,
						rare = itemInformation[itemResult[i].name].rare,
						can_remove = itemInformation[itemResult[i].name].can_remove,
						price = v.price,
						count = 99999999
					})
				end
			end
		end
		if shoptype == "robsliquor" then
			for _, v in pairs(Config.Shops.RobsLiquor.Items) do
				if v.name == itemResult[i].name then
					table.insert(itemShopList, {
						type = "item_standard",
						name = itemInformation[itemResult[i].name].name,
						label = itemInformation[itemResult[i].name].label,
						weight = itemInformation[itemResult[i].name].weight,
						rare = itemInformation[itemResult[i].name].rare,
						can_remove = itemInformation[itemResult[i].name].can_remove,
						price = v.price,
						count = 99999999
					})
				end
			end
		end
		if shoptype == "youtool" then
			for _, v in pairs(Config.Shops.YouTool.Items) do
				if v.name == itemResult[i].name then
					table.insert(itemShopList, {
						type = "item_standard",
						name = itemInformation[itemResult[i].name].name,
						label = itemInformation[itemResult[i].name].label,
						weight = itemInformation[itemResult[i].name].weight,
						rare = itemInformation[itemResult[i].name].rare,
						can_remove = itemInformation[itemResult[i].name].can_remove,
						price = v.price,
						count = 99999999
					})
				end
			end
		end
		if shoptype == "policeshop" then
			for _, v in pairs(Config.Shops.PoliceShop.Items) do
				if v.name == itemResult[i].name then
					table.insert(itemShopList, {
						type = "item_standard",
						name = itemInformation[itemResult[i].name].name,
						label = itemInformation[itemResult[i].name].label,
						weight = itemInformation[itemResult[i].name].weight,
						rare = itemInformation[itemResult[i].name].rare,
						can_remove = itemInformation[itemResult[i].name].can_remove,
						price = v.price,
						count = 99999999
					})
				end
			end
		end
		if shoptype == "prison" then
			for _, v in pairs(Config.Shops.PrisonShop.Items) do
				if v.name == itemResult[i].name then
					table.insert(itemShopList, {
						type = "item_standard",
						name = itemInformation[itemResult[i].name].name,
						label = itemInformation[itemResult[i].name].label,
						weight = itemInformation[itemResult[i].name].weight,
						rare = itemInformation[itemResult[i].name].rare,
						can_remove = itemInformation[itemResult[i].name].can_remove,
						price = v.price,
						count = 99999999
					})
				end
			end
		end
		if shoptype == "weaponshop" then
			for _, v in pairs(Config.Shops.WeaponShop.Items) do
				if v.name == itemResult[i].name then
					table.insert(itemShopList, {
						type = "item_standard",
						name = itemInformation[itemResult[i].name].name,
						label = itemInformation[itemResult[i].name].label,
						weight = itemInformation[itemResult[i].name].weight,
						rare = itemInformation[itemResult[i].name].rare,
						can_remove = itemInformation[itemResult[i].name].can_remove,
						price = v.price,
						count = 99999999
					})
				end
			end
		end
	end
	cb(itemShopList)
end)

ESX.RegisterServerCallback("suku:getCustomShopItems", function(source, cb, shoptype, customInventory)
	itemShopList = {}
	local itemResult = MySQL.Sync.fetchAll('SELECT * FROM items')
	local itemInformation = {}
	for i=1, #itemResult, 1 do
		if itemInformation[itemResult[i].name] == nil then
			itemInformation[itemResult[i].name] = {}
		end
		itemInformation[itemResult[i].name].name = itemResult[i].name
		itemInformation[itemResult[i].name].label = itemResult[i].label
		itemInformation[itemResult[i].name].weight = itemResult[i].weight
		itemInformation[itemResult[i].name].rare = itemResult[i].rare
		itemInformation[itemResult[i].name].can_remove = itemResult[i].can_remove
		if shoptype == "normal" then
			for _, v in pairs(customInventory.Items) do
				if v.name == itemResult[i].name then
					table.insert(itemShopList, {
						type = "item_standard",
						name = itemInformation[itemResult[i].name].name,
						label = itemInformation[itemResult[i].name].label,
						weight = itemInformation[itemResult[i].name].weight,
						rare = itemInformation[itemResult[i].name].rare,
						can_remove = itemInformation[itemResult[i].name].can_remove,
						price = itemInformation[itemResult[i].name].price,
						count = 99999999
					})
				end
			end
		end

		if shoptype == "weapon" then
			local weapons = customInventory.Weapons
			for _, v in pairs(customInventory.Weapons) do
				if v.name == itemResult[i].name then
					table.insert(itemShopList, {
						type = "item_weapon",
						name = itemInformation[itemResult[i].name].name,
						label = itemInformation[itemResult[i].name].label,
						weight = 0,
						ammo = v.ammo,
						rare = itemInformation[itemResult[i].name].rare,
						can_remove = itemInformation[itemResult[i].name].can_remove,
						price = itemInformation[itemResult[i].name].price,
						count = 99999999
					})
				end
			end
			local ammo = customInventory.Ammo
			for _,v in pairs(customInventory.Ammo) do
				if v.name == itemResult[i].name then
					table.insert(itemShopList, {
						type = "item_ammo",
						name = itemInformation[itemResult[i].name].name,
						label = itemInformation[itemResult[i].name].label,
						weight = 0,
						weaponhash = v.weaponhash,
						ammo = v.ammo,
						rare = itemInformation[itemResult[i].name].rare,
						can_remove = itemInformation[itemResult[i].name].can_remove,
						price = itemInformation[itemResult[i].name].price,
						count = 99999999
					})
				end
			end

			for _, v in pairs(customInventory.Items) do
				if v.name == itemResult[i].name then
					table.insert(itemShopList, {
						type = "item_standard",
						name = itemInformation[itemResult[i].name].name,
						label = itemInformation[itemResult[i].name].label,
						weight = itemInformation[itemResult[i].name].weight,
						rare = itemInformation[itemResult[i].name].rare,
						can_remove = itemInformation[itemResult[i].name].can_remove,
						price = itemInformation[itemResult[i].name].price,
						count = 99999999
					})
				end
			end
		end
	end
	cb(itemShopList)
end)
RegisterNetEvent("suku:SellItemToPlayer")
AddEventHandler("suku:SellItemToPlayer",function(source, type, item, count)
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)
	if type == "item_standard" then
		local targetItem = xPlayer.getInventoryItem(item)
		if xPlayer.canCarryItem(item, count) then
			local list = itemShopList
			for i = 1, #list, 1 do
				if list[i].name == item then
					local totalPrice = count * list[i].price
					if xPlayer.getMoney() >= totalPrice then
						xPlayer.removeMoney(GetCurrentResourceName(), totalPrice, 'Mua đồ từ tạp hóa')
						xPlayer.addInventoryItem(GetCurrentResourceName(), item, count)
			--			TriggerEvent("tqrp_base:serverlog", "[BUYITEM]: ("..item .. ") x" .. count .. " $("..totalPrice..")", _source, GetCurrentResourceName())
						TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'success', text = 'Compraste '..count.." "..list[i].label })
					else
						TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'error', text = 'Não tens dinheiro suficiente!' })
					end
				end
			end
		else
			TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'error', text = 'Não consegues carregar mais nada no inventário!' })
		end
	end
	if type == "item_weapon" then
		local targetItem = xPlayer.getInventoryItem(item)
		if targetItem.count < 1 then
			local list = itemShopList
			for i = 1, #list, 1 do
				if list[i].name == item then
					local targetWeapon = xPlayer.hasWeapon(tostring(list[i].name))
					if not targetWeapon then
						local totalPrice = 1 * list[i].price
						if xPlayer.getMoney() >= totalPrice then
							xPlayer.removeMoney(GetCurrentResourceName(), totalPrice, 'Mua súng')
							xPlayer.addWeapon(list[i].name, 500)
							TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'success', text = 'Compraste '..list[i].label })
						else
							TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'error', text = 'Não tens dinheiro suficiente!' })
						end
					else
						xPlayer.addWeaponAmmo(list[i].name, 500)
						--TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'error', text = 'You already own this weapon!' })
					end
				end
			end
		else
			TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'error', text = 'Já tens essa arma!' })
		end
		--[[ if xPlayer.canCarryItem(item, count) then
			local list = itemShopList
			for i = 1, #list, 1 do
				if list[i].name == item then
					local totalPrice = count * list[i].price
					if xPlayer.getMoney() >= totalPrice then
						xPlayer.removeMoney(GetCurrentResourceName(), totalPrice)
						xPlayer.addInventoryItem(GetCurrentResourceName(), item, count)
				--		TriggerEvent("tqrp_base:serverlog", "[BUYITEM]: ("..item .. ") x" .. count .. " $("..totalPrice..")", _source, GetCurrentResourceName())
						TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'success', text = 'Compraste '..count.." "..list[i].label })
					else
						TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'error', text = 'Não tens dinheiro suficiente!' })
					end
				end
			end
		else
			TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'error', text = 'Não consegues carregar mais nada no inventário!' })
		end ]]
	end

	if type == "item_ammo" then
		local targetItem = xPlayer.getInventoryItem(item)
		local list = itemShopList
		for i = 1, #list, 1 do
			if list[i].name == item then
				local targetWeapon = xPlayer.hasWeapon(list[i].weaponhash)
				if targetWeapon then
					local totalPrice = count * list[i].price
					local ammo = count * list[i].ammo
					if xPlayer.getMoney() >= totalPrice then
						xPlayer.removeMoney(GetCurrentResourceName(), totalPrice)
						TriggerClientEvent("suku:AddAmmoToWeapon", source, list[i].weaponhash, ammo)
				--		TriggerEvent("tqrp_base:serverlog", "[BUYAMMO]: ("..list[i].weaponhash .. ") x" .. ammo .. " $("..totalPrice..")", _source, GetCurrentResourceName())
						TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'success', text = 'Compraste '..count.." "..list[i].label })
					else
						TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'error', text = 'Não tens dinheiro suficiente!' })
					end
				else
					TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'error', text = 'Não tens a arma para este tipo de munição!' })
				end
			end
		end
	end
end)

--[[ Citizen.CreateThread(function()
	Citizen.Wait(10)
	MySQL.Async.fetchAll('SELECT * FROM items WHERE LCASE(name) LIKE \'%weapon_%\'', {}, function(results)
		for k, v in pairs(results) do
			ESX.RegisterUsableItem(v.name, function(source)
				TriggerClientEvent('conde-inventoryhud:useWeapon', source, v.name)
			end)
		end
	end)
end) ]]

RegisterServerEvent('conde-inventoryhud:updateAmmoCount')
AddEventHandler('conde-inventoryhud:updateAmmoCount', function(hash, wepInfo)
	local player = ESX.GetPlayerFromId(source)
	MySQL.Async.execute('UPDATE disc_ammo SET count = @count, attach = @attach WHERE hash = @hash AND owner = @owner', {
		['@owner'] = player.identifier,
		['@hash'] = hash,
		['@count'] = wepInfo.count,
		['@attach'] = json.encode(wepInfo.attach)
	}, function(results)
		if results == 0 then
			MySQL.Async.execute('INSERT INTO disc_ammo (owner, hash, count, attach) VALUES (@owner, @hash, @count, @attach)', {
				['@owner'] = player.identifier,
				['@hash'] = hash,
				['@count'] = wepInfo.count,
				['@attach'] = json.encode(wepInfo.attach)
			})
		end
	end)
end)

ESX.RegisterServerCallback('conde-inventoryhud:getAmmoCount', function(source, cb, hash, weaponName)
	local player = ESX.GetPlayerFromId(source)
	if player.getInventoryItem(weaponName).count == 0 then
		DropPlayer(source, 'Bug súng')
	end
	MySQL.Async.fetchAll('SELECT * FROM disc_ammo WHERE owner = @owner and hash = @hash', {
		['@owner'] = player.identifier,
		['@hash'] = hash
	}, function(results)
		if #results == 0 then
			local cbResult = {
				ammoCount = nil,
				attachments = {}
			}
			cb(cbResult)
		else
			local cbResult = {
				ammoCount = results[1].count,
				attachments = json.decode(results[1].attach)
			}
			cb(cbResult)
		end
	end)
end)


Citizen.CreateThread(function()
	for i = 1, #Config.Attachments do
		ESX.RegisterUsableItem(Config.Attachments[i], function(source)
			TriggerClientEvent("tqrp_inventoryhud:useAttach", source, Config.Attachments[i])
		end)
	end
end)

