var type = "normal";
var disabled = false;
var disabledFunction = null;
var ownerHouse = null;
var coisas = [];
var itemData = [];

var defaultvalue = 0;

function widthHeightSplit(value, ele) {
  let height = 25.5;
  let eleHeight = (value / 100) * height;
  let leftOverHeight = height - eleHeight;

  ele.css("height", eleHeight + "px");
  ele.css("top", leftOverHeight + "px");
}

window.addEventListener("message", function (event) {
  if (event.data.action == "display") {
    type = event.data.type;
    disabled = false;

    if (type === "normal") {
      $(".weight-div").show();
      $(".info-div").hide();
      $("#noSecondInventoryMessage").hide();
      $("#otherInventory").hide();
      $("#boxSetHealth").css("width", event.data.health + "%");
      $("#boxSetArmour").css("width", event.data.armour + "%");
      $("#boxSetWeight").css("width", event.data.weight + "%");
      widthHeightSplit(event.data.hunger, $("#boxSetHunger"));
      widthHeightSplit(event.data.thirst, $("#boxSetThirst"));
      widthHeightSplit(event.data.oxygen, $("#boxSetOxygen"));
      widthHeightSplit(event.data.stress, $("#boxSetStress"));
    } else if (type === "trunk") {
      $(".info-div").show();
      $("#otherInventory").show();
      $(".weight-div").show();
    } else if (type === "Society") {
      $(".info-div").show();
      $("#otherInventory").show();
      $(".weight-div").hide();
    } else if (type === "property") {
      $(".info-div").hide();
      $("#otherInventory").show();
      $(".weight-div").hide();
      ownerHouse = event.data.owner;
    } else if (type === "player") {
      $(".info-div").show();
      $(".weight-div").show();
      $("#otherInventory").show();
    } else if (type === "shop") {
      $(".info-div").show();
      $(".weight-div").show();
      $("#otherInventory").show();
    } else if (type === "motels") {
      $(".info-div").show();
      $(".weight-div").show();
      $("#otherInventory").show();
    } else if (type === "motelsbed") {
      $(".info-div").show();
      $(".weight-div").show();
      $("#otherInventory").show();
    } else if (type === "glovebox") {
      $(".info-div").show();
      $(".weight-div").show();
      $("#otherInventory").show();
    } else if (type === "vault") {
      $(".info-div").show();
      $(".weight-div").show();
      $("#otherInventory").show();
    }

    $(".ui").show("slide", { direction: "left" }, 100);
  } else if (event.data.action == "hide") {
    $("#dialog").dialog("close");

    $(".ui").hide("slide", { direction: "right" }, 100);

    $(".item").remove();
    //   $("#otherInventory").html("<div id=\"noSecondInventoryMessage\"></div>");
    //    $("#noSecondInventoryMessage").html(invLocale.secondInventoryNotAvailable);
  } else if (event.data.action == "setItems") {
    inventorySetup(event.data.itemList, event.data.fastItems);
    $("#boxSetWeight").css("width", event.data.weight + "%");
    $(".item").draggable({
      helper: "clone",
      appendTo: "body",
      zIndex: 99999,
      revert: "invalid",
      start: function (event, ui) {
        if (disabled) {
          return false;
        }
        $(this).css("background-image", "none");
        itemData = $(this).data("item");
        itemInventory = $(this).data("inventory");
        if (itemInventory == "second") {
          $("#drop").addClass("disabled");
          $("#give").addClass("disabled");
        }
        if (itemInventory == "second") {
          $("#use").addClass("disabled");
        }
      },
      stop: function () {
        itemData = $(this).data("item");

        if (itemData !== undefined && itemData.name !== undefined) {
          var CheckItem = itemData.name.search("keyhouse");
          if (CheckItem == -1) {
            $(this).css(
              "background-image",
              "url('./img/" + itemData.name + ".png'"
            );
          } else {
            $(this).css("background-image", "url('./img/keyhouse.png'");
          }
          $("#drop").removeClass("disabled");
          $("#use").removeClass("disabled");
          $("#give").removeClass("disabled");
        }
      },
    });
  } else if (event.data.action == "setSecondInventoryItems") {
    secondInventorySetup(event.data.itemList);
  } else if (event.data.action == "setShopInventoryItems") {
    shopInventorySetup(event.data.itemList);
  } else if (event.data.action == "setInfoText") {
    $(".info-div").html(event.data.text);
  } else if (event.data.action == "setWeightText") {
    $(".weight-div").html(event.data.text);
  } else if (event.data.action == "nearPlayers") {
    $("#nearPlayers").html("");

    $.each(event.data.players, function (index, player) {
      $("#nearPlayers").append(
        '<button class="nearbyPlayerButton" data-player="' +
          player.player +
          '">[' +
          player.idcard +
          "]</button>"
      );
    });
    $("#dialog").dialog("open");
    $(".nearbyPlayerButton").click(function () {
      $("#dialog").dialog("close");
      player = $(this).data("player");
      $.post(
        "http://conde-b1g_inventory/GiveItem",
        JSON.stringify({
          player: player,
          item: event.data.item,
          number: event.data.number,
        })
      );
    });
  } else if (event.data.action == "notification") {
    sendNotification(
      event.data.itemname,
      event.data.itemlabel,
      event.data.itemcount,
      event.data.itemremove
    );
  } else if (event.data.action == "showhotbar") {
    showHotbar(event.data.itemList, event.data.fastItems, event.data);
  }
});

function showHotbar(items, fastItems, data) {
  $("#playerInventoryHotbar").html("");
  $("#playerInventoryHotbar").show("slide", { direction: "down" }, 200);

  setTimeout(function () {
    $("#playerInventoryHotbar").hide("slide", { direction: "up" }, 200);
    $("#playerInventoryHotbar").html("");
  }, 3000);

  var i;
  for (i = 1; i < 10; i++) {
    $("#playerInventoryHotbar").append(
      '<div class="slotFast"><div id="itemFast-' +
        i +
        '" class="item" >' +
        '<div class="keybind">' +
        i +
        '</div><div class="item-count"></div> <div class="item-name"></div> </div ><div class="item-name-bg"></div></div>'
    );
  }

  $.each(fastItems, function (index, item) {
    count = setCount(item);
    var CheckItem = item.name.search("keyhouse");
    var DoBenSung = "";
    if (item.type == "item_weapon") {
      DoBenSung = `<div class="weapon-bar" style="height: ${item.doben}%"></div>`;
    }

    if (CheckItem == -1) {
      $("#itemFast-" + item.slot).css(
        "background-image",
        "url('./img/" + item.name + ".png')"
      );
    } else {
      $("#itemFast-" + item.slot).css(
        "background-image",
        "url('./img/keyhouse.png')"
      );
    }
    $("#itemFast-" + item.slot).html(`
            <div class="keybind">${item.slot}</div>
            <div class="item-count">${count}</div>
            <div class="item-name">${item.label}</div>
            <div class="item-name-bg"></div>
            ${DoBenSung}
        `);
    $("#itemFast-" + item.slot).data("item", item);
    $("#itemFast-" + item.slot).data("inventory", "fast");
  });
}
var alertTimer = null;

function sendNotification(item, itemlabel, count, remove) {
  //$("#notificacao").html("");
  //$("#notificacao").fadeIn();
  clearTimeout(alertTimer);
  if (remove) {
    var CheckItem = item.search("keyhouse");
    if (CheckItem == -1) {
      $("#notificacao").append(
        '<div class="slot" style="background-color: rgba(255, 166, 0, 0)" id="noti"><div class="item2" style = "background-image: url(\'./img/' +
          item +
          ".png')\">" +
          '<div class="item-count">-' +
          count +
          '</div> <div class="item-name">' +
          itemlabel +
          '</div> </div ><div class="item-name-bg"></div></div>'
      );
    } else {
      $("#notificacao").append(
        '<div class="slot" style="background-color: rgba(255, 166, 0, 0)" id="noti"><div class="item2" style = "background-image: url(\'./img/keyhouse.png\')">' +
          '<div class="item-count">-' +
          count +
          '</div> <div class="item-name">' +
          itemlabel +
          '</div> </div ><div class="item-name-bg"></div></div>'
      );
    }
    $("#notificacao").show("slide", { direction: "left" }, 500, function () {
      alertTimer = setTimeout(function () {
        $("#notificacao").hide(
          "slide",
          { direction: "left" },
          500,
          function () {
            $("#notificacao").empty();
          }
        );
      }, 2500);
    });
  } else {
    var CheckItem = item.search("keyhouse");
    if (CheckItem == -1) {
      $("#notificacao").append(
        '<div class="slot" style="background-color: rgba(255, 166, 0, 0)" id="noti"><div class="item2" style = "background-image: url(\'./img/' +
          item +
          ".png')\">" +
          '<div class="item-count">+' +
          count +
          '</div> <div class="item-name">' +
          itemlabel +
          '</div> </div ><div class="item-name-bg"></div></div>'
      );
    } else {
      $("#notificacao").append(
        '<div class="slot" style="background-color: rgba(255, 166, 0, 0)" id="noti"><div class="item2" style = "background-image: url(\'./img/keyhouse.png\')">' +
          '<div class="item-count">+' +
          count +
          '</div> <div class="item-name">' +
          itemlabel +
          '</div> </div ><div class="item-name-bg"></div></div>'
      );
    }
    $("#notificacao").show("slide", { direction: "left" }, 500, function () {
      alertTimer = setTimeout(function () {
        $("#notificacao").hide(
          "slide",
          { direction: "left" },
          500,
          function () {
            $("#notificacao").empty();
          }
        );
      }, 2500);
    });
  }
}

function closeInventory() {
  $(".ui").hide("slide", { direction: "right" }, 100);
  $.post("http://conde-b1g_inventory/NUIFocusOff", JSON.stringify({}));
  $(".menu-more").hide();
}

function inventorySetup(items, fastItems) {
  $("#playerInventory").html("");
  var numberitem = 0;
  var itemInventory = $(this).data("inventory");
  $.each(items, function (index, item) {
    count = setCount(item);
    var CheckItem = item.name.search("keyhouse");
    var DoBenSung = "";
    if (item.type == "item_weapon") {
      DoBenSung = `<div class="weapon-bar" style="height: ${item.doben}%"></div>`;
    }
    if (CheckItem == -1) {
      $("#playerInventory").append(`
            <div class="slot">
                <div id="item-${index}" class="item" style="background-image: url(\'./img/${item.name}.png\')">
                    <div class="item-count">${count}</div>
                    <div class="item-name">${item.label}</div>
                    ${DoBenSung}
                </div>
                <div class="item-name-bg"></div>
            </div>`);
    } else {
      $("#playerInventory").append(`
            <div class="slot">
                <div id="item-${index}" class="item" style="background-image: url(\'./img/keyhouse.png\')">
                    <div class="item-count">${count}</div>
                    <div class="item-name">${item.label}</div>
                    ${DoBenSung}
                </div>
                <div class="item-name-bg"></div>
            </div>`);
    }

    $("#item-" + index).data("item", item);
    $("#item-" + index).data("inventory", "main");
    numberitem = numberitem + 1;
  });

  var i;
  for (i = 1; i < 100 - numberitem; i++) {
    $("#playerInventory").append(
      '<div class="slot"><div id="item-' +
        i +
        '" class="item" style = "background-image: url(\'./img/' +
        "blank" +
        ".png')\">" +
        '<div class="item-count"></div> <div class="item-name"> </div> </div ><div class="item-name-bg"></div></div>'
    );
  }
  $("#playerInventoryFastItems").html("");

  for (i = 1; i < 10; i++) {
    $("#playerInventoryFastItems").append(`
      <div class="slotFast">
        <div id="itemFast-${i}" class="item">
            <div class="keybind">${i}</div>
            <div class="item-count"></div>
            <div class="item-name"></div>
        </div>
        <div class="item-name-bg"></div>
    </div>`);
  }

  for (i = 1; i < 11; i++) {
    coisas[i] = false;
  }

  fastItems.forEach(function (item, index, array) {
    count = setCount(item);
    coisas[item.slot] = true;
    var CheckItem = item.name.search("keyhouse");
    var DoBenSung = "";
    if (item.type == "item_weapon") {
      DoBenSung = `<div class="weapon-bar" style="height: ${item.doben}%"></div>`;
    }
    if (CheckItem == -1) {
      $("#itemFast-" + item.slot).css(
        "background-image",
        "url('./img/" + item.name + ".png')"
      );
    } else {
      $("#itemFast-" + item.slot).css(
        "background-image",
        "url('./img/keyhouse.png')"
      );
    }
    0;
    $("#itemFast-" + item.slot).html(`
            <div class="keybind">${item.slot}</div>
            <div class="item-count">${count}</div>
            <div class="item-name">${item.label}</div>
            <div class="item-name-bg"></div>
            ${DoBenSung}
        `);
    $("#itemFast-" + item.slot).data("item", item);
    $("#itemFast-" + item.slot).data("inventory", "fast");
  });

  makeDraggables();

  if (type === "normal" && itemInventory === "second") {
    $("#otherInventory").html("");
    for (i = 1; i < 151; i++) {
      $("#otherInventory").append(
        '<div class="slot"><div id="item-' +
          i +
          '" class="item" style = "background-image: url(\'./img/' +
          "blank" +
          ".png')\">" +
          '<div class="item-count"></div> <div class="item-name"> </div> </div ><div class="item-name-bg"></div></div>'
      );
    }
  }
}

function makeDraggables() {
  $("#itemFast-1").droppable({
    drop: function (event, ui) {
      itemData = ui.draggable.data("item");
      itemInventory = ui.draggable.data("inventory");
      if (
        type === "normal" &&
        (itemInventory === "main" || itemInventory === "fast")
      ) {
        $.post(
          "http://conde-b1g_inventory/PutIntoFast",
          JSON.stringify({
            item: itemData,
            slot: 1,
          })
        );
      }
    },
  });
  $("#itemFast-2").droppable({
    drop: function (event, ui) {
      itemData = ui.draggable.data("item");
      itemInventory = ui.draggable.data("inventory");

      if (
        type === "normal" &&
        (itemInventory === "main" || itemInventory === "fast")
      ) {
        $.post(
          "http://conde-b1g_inventory/PutIntoFast",
          JSON.stringify({
            item: itemData,
            slot: 2,
          })
        );
      }
    },
  });
  $("#itemFast-3").droppable({
    drop: function (event, ui) {
      itemData = ui.draggable.data("item");
      itemInventory = ui.draggable.data("inventory");

      if (
        type === "normal" &&
        (itemInventory === "main" || itemInventory === "fast")
      ) {
        $.post(
          "http://conde-b1g_inventory/PutIntoFast",
          JSON.stringify({
            item: itemData,
            slot: 3,
          })
        );
      }
    },
  });
  $("#itemFast-4").droppable({
    drop: function (event, ui) {
      itemData = ui.draggable.data("item");
      itemInventory = ui.draggable.data("inventory");

      if (
        type === "normal" &&
        (itemInventory === "main" || itemInventory === "fast")
      ) {
        $.post(
          "http://conde-b1g_inventory/PutIntoFast",
          JSON.stringify({
            item: itemData,
            slot: 4,
          })
        );
      }
    },
  });
  $("#itemFast-5").droppable({
    drop: function (event, ui) {
      itemData = ui.draggable.data("item");
      itemInventory = ui.draggable.data("inventory");

      if (
        type === "normal" &&
        (itemInventory === "main" || itemInventory === "fast")
      ) {
        $.post(
          "http://conde-b1g_inventory/PutIntoFast",
          JSON.stringify({
            item: itemData,
            slot: 5,
          })
        );
      }
    },
  });
  $("#itemFast-6").droppable({
    drop: function (event, ui) {
      itemData = ui.draggable.data("item");
      itemInventory = ui.draggable.data("inventory");

      if (
        type === "normal" &&
        (itemInventory === "main" || itemInventory === "fast")
      ) {
        $.post(
          "http://conde-b1g_inventory/PutIntoFast",
          JSON.stringify({
            item: itemData,
            slot: 6,
          })
        );
      }
    },
  });
  $("#itemFast-7").droppable({
    drop: function (event, ui) {
      itemData = ui.draggable.data("item");
      itemInventory = ui.draggable.data("inventory");

      if (
        type === "normal" &&
        (itemInventory === "main" || itemInventory === "fast")
      ) {
        $.post(
          "http://conde-b1g_inventory/PutIntoFast",
          JSON.stringify({
            item: itemData,
            slot: 7,
          })
        );
      }
    },
  });
  $("#itemFast-8").droppable({
    drop: function (event, ui) {
      itemData = ui.draggable.data("item");
      itemInventory = ui.draggable.data("inventory");

      if (
        type === "normal" &&
        (itemInventory === "main" || itemInventory === "fast")
      ) {
        $.post(
          "http://conde-b1g_inventory/PutIntoFast",
          JSON.stringify({
            item: itemData,
            slot: 8,
          })
        );
      }
    },
  });
  $("#itemFast-9").droppable({
    drop: function (event, ui) {
      itemData = ui.draggable.data("item");
      itemInventory = ui.draggable.data("inventory");

      if (
        type === "normal" &&
        (itemInventory === "main" || itemInventory === "fast")
      ) {
        $.post(
          "http://conde-b1g_inventory/PutIntoFast",
          JSON.stringify({
            item: itemData,
            slot: 9,
          })
        );
      }
    },
  });
}

function secondInventorySetup(items) {
  $("#otherInventory").html("");
  $("#controls").show();
  var i;
  var numberitem = 0;
  $.each(items, function (index, item) {
    count = setCount(item);
    var CheckItem = item.name.search("keyhouse");
    if (CheckItem == -1) {
      $("#otherInventory").append(`
            <div class="slot">
                <div id="itemOther-${index}" class="item" style="background-image: url(\'./img/${item.name}.png\')">
                    <div class="item-count">${count}</div>
                    <div class="item-name">${item.label}</div>
                </div>
                <div class="item-name-bg"></div>
            </div>`);
    } else {
      $("#otherInventory").append(`
            <div class="slot">
                <div id="itemOther-${index}" class="item" style = "background-image: url(\'./img/keyhouse.png\')"> 
                    <div class="item-count">${count}</div> 
                    <div class="item-name">${item.label}</div> 
                </div >
                <div class="item-name-bg"></div>
            </div>`);
    }

    $("#itemOther-" + index).data("item", item);
    $("#itemOther-" + index).data("inventory", "second");
    numberitem = numberitem + 1;
  });
  for (i = 1; i < 151 - numberitem; i++) {
    $("#otherInventory").append(
      '<div class="slot"><div id="item-' +
        i +
        '" class="item" style = "background-image: url(\'./img/' +
        "blank" +
        ".png')\">" +
        '<div class="item-count"></div> <div class="item-name"> </div> </div ><div class="item-name-bg"></div></div>'
    );
  }
}

function shopInventorySetup(items) {
  $("#otherInventory").html("");
  $("#controls").show();
  $.each(items, function (index, item) {
    //count = setCount(item)
    cost = setCost(item);
    var CheckItem = item.name.search("keyhouse");
    if (CheckItem == -1) {
      $("#otherInventory").append(
        '<div class="slot"><div id="itemOther-' +
          index +
          '" class="item" style = "background-image: url(\'./img/' +
          item.name +
          ".png')\">" +
          '<div class="item-count">' +
          cost +
          '</div> <div class="item-name">' +
          item.label +
          '</div> </div ><div class="item-name-bg"></div></div>'
      );
    } else {
      $("#otherInventory").append(
        '<div class="slot"><div id="itemOther-' +
          index +
          '" class="item" style = "background-image: url(\'./img/keyhouse.png\')">' +
          '<div class="item-count">' +
          cost +
          '</div> <div class="item-name">' +
          item.label +
          '</div> </div ><div class="item-name-bg"></div></div>'
      );
    }

    $("#itemOther-" + index).data("item", item);
    $("#itemOther-" + index).data("inventory", "second");
  });
}

function Interval(time) {
  var timer = false;
  this.start = function () {
    if (this.isRunning()) {
      clearInterval(timer);
      timer = false;
    }

    timer = setInterval(function () {
      disabled = false;
    }, time);
  };
  this.stop = function () {
    clearInterval(timer);
    timer = false;
  };
  this.isRunning = function () {
    return timer !== false;
  };
}

function setCount(item) {
  count = item.count;

  if (item.type === "item_weapon") {
    var doben = item.doben || 1000;
    if (count == 0) {
      count = "";
    } else {
      count =
        '<img src="./img/bullet.png" class="ammoIcon"> ' +
        item.count /* + ' | ' + doben/10 + '%' */;
    }
  }

  if (item.type === "item_account" || item.type === "item_money") {
    count = formatMoney(item.count) + "$";
  }

  return count;
}

function setCost(item) {
  cost = item.price;
  if (item.price == 0) {
    cost = item.price + "$";
  }
  if (item.price > 0) {
    cost = item.price + "$";
  }
  return cost;
}

function formatMoney(n, c, d, t) {
  var c = isNaN((c = Math.abs(c))) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
    j = (j = i.length) > 3 ? j % 3 : 0;

  return (
    s +
    (j ? i.substr(0, j) + t : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)
  );
}

var ThisItemSelect = [];

$(document).ready(function () {
  $("#count")
    .focus(function () {
      $(this).val("");
    })
    .blur(function () {
      if ($(this).val() == "") {
        $(this).val("1");
      }
    });

  $("body").on("keyup", function (key) {
    if (Config.closeKeys.includes(key.which)) {
      closeInventory();
    }
  });

  $(document).on("dblclick", ".item", function () {
    itemData = $(this).data("item");

    if (itemData == undefined || itemData.usable == undefined) {
      return;
    }

    itemInventory = $(this).data("inventory");

    if (itemInventory == undefined || itemInventory == "second") {
      return;
    }
    if (type === "normal" && itemInventory === "fast") {
      if (itemData.type == "item_weapon") {
        coisas[itemData.slot] = false;
        $.post(
          "http://conde-b1g_inventory/TakeFromFast",
          JSON.stringify({
            item: itemData,
          })
        );
      } else {
        $.post("http://conde-b1g_inventory/UseItem", JSON.stringify(itemData));
        closeInventory();
      }
    } else if (type === "normal" && itemInventory === "main") {
      if (itemData.type == "item_weapon") {
        for (i = 1; i < 10; i++) {
          if (coisas[i] == false) {
            $("#itemFast-" + itemData.slot).slideUp("slow", function () {});
            coisas[i] = true;
            $.post(
              "http://conde-b1g_inventory/PutIntoFast",
              JSON.stringify({
                item: itemData,
                slot: i,
              })
            );
            break;
          }
        }
      } else {
        $.post("http://conde-b1g_inventory/UseItem", JSON.stringify(itemData));
        closeInventory();
      }
    } else {
      $(this).effect("bounce", "slow");
    }
  });

  $(document).on("click", ".item", function (e) {
    $(".menu-more").hide();
  });

  $(document).on("contextmenu", ".item", function (e) {
    $(".menu-more").hide();
    itemData = $(this).data("item");

    if (itemData !== undefined) {
      itemInventory = $(this).data("inventory");
      if (e.shiftKey) {
        if (itemInventory === "second") {
          if (type === "trunk") {
            $.post(
              "http://conde-b1g_inventory/TakeFromTrunk",
              JSON.stringify({
                item: itemData,
                number: parseInt($("#count").val()),
              })
            );
          } else if (type === "property") {
            $.post(
              "http://conde-b1g_inventory/TakeFromProperty",
              JSON.stringify({
                item: itemData,
                number: parseInt($("#count").val()),
                owner: ownerHouse,
              })
            );
          } else if (type === "Society") {
            $.post(
              "http://conde-b1g_inventory/TakeFromSociety",
              JSON.stringify({
                item: itemData,
                number: parseInt($("#count").val()),
                owner: ownerHouse,
              })
            );
          } else if (type === "vault") {
            $.post(
              "http://conde-b1g_inventory/TakeFromVault",
              JSON.stringify({
                item: itemData,
                number: parseInt($("#count").val()),
              })
            );
          } else if (type === "player") {
            $.post(
              "http://conde-b1g_inventory/TakeFromPlayer",
              JSON.stringify({
                item: itemData,
                number: parseInt($("#count").val()),
              })
            );
          } else if (type === "normal" && itemInventory === "fast") {
            coisas[itemData.slot] = false;
            $.post(
              "http://conde-b1g_inventory/TakeFromFast",
              JSON.stringify({
                item: itemData,
              })
            );
          } else if (type === "shop") {
            $.post(
              "http://conde-b1g_inventory/TakeFromShop",
              JSON.stringify({
                item: itemData,
                number: parseInt($("#count").val()),
              })
            );
          } else if (type === "motels") {
            $.post(
              "http://conde-b1g_inventory/TakeFromMotel",
              JSON.stringify({
                item: itemData,
                number: parseInt($("#count").val()),
              })
            );
          } else if (type === "motelsbed") {
            $.post(
              "http://conde-b1g_inventory/TakeFromMotelBed",
              JSON.stringify({
                item: itemData,
                number: parseInt($("#count").val()),
              })
            );
          } else if (type === "glovebox") {
            $.post(
              "http://conde-b1g_inventory/TakeFromGlovebox",
              JSON.stringify({
                item: itemData,
                number: parseInt($("#count").val()),
              })
            );
          }
        } else if (itemInventory === "main") {
          if (type === "trunk") {
            $.post(
              "http://conde-b1g_inventory/PutIntoTrunk",
              JSON.stringify({
                item: itemData,
                number: parseInt($("#count").val()),
              })
            );
          } else if (type === "property") {
            $.post(
              "http://conde-b1g_inventory/PutIntoProperty",
              JSON.stringify({
                item: itemData,
                number: parseInt($("#count").val()),
                owner: ownerHouse,
              })
            );
          } else if (type === "Society") {
            $.post(
              "http://conde-b1g_inventory/PutIntoSociety",
              JSON.stringify({
                item: itemData,
                number: parseInt($("#count").val()),
                owner: ownerHouse,
              })
            );
          } else if (type === "vault") {
            $.post(
              "http://conde-b1g_inventory/PutIntoVault",
              JSON.stringify({
                item: itemData,
                number: parseInt($("#count").val()),
              })
            );
          } else if (type === "player") {
            $.post(
              "http://conde-b1g_inventory/PutIntoPlayer",
              JSON.stringify({
                item: itemData,
                number: parseInt($("#count").val()),
              })
            );
          } else if (type === "motels") {
            $.post(
              "http://conde-b1g_inventory/PutIntoMotel",
              JSON.stringify({
                item: itemData,
                number: parseInt($("#count").val()),
              })
            );
          } else if (type === "motelsbed") {
            $.post(
              "http://conde-b1g_inventory/PutIntoMotelBed",
              JSON.stringify({
                item: itemData,
                number: parseInt($("#count").val()),
              })
            );
          } else if (type === "glovebox") {
            $.post(
              "http://conde-b1g_inventory/PutIntoGlovebox",
              JSON.stringify({
                item: itemData,
                number: parseInt($("#count").val()),
              })
            );
          } else if (type === "normal") {
            for (i = 1; i < 10; i++) {
              if (coisas[i] == false) {
                $("#itemFast-" + itemData.slot).fadeOut();
                coisas[i] = true;
                $.post(
                  "http://conde-b1g_inventory/PutIntoFast",
                  JSON.stringify({
                    item: itemData,
                    slot: i,
                  })
                );
                break;
              }
            }
          }
        } else if (type === "normal" && itemInventory === "fast") {
          coisas[itemData.slot] = false;
          $.post(
            "http://conde-b1g_inventory/TakeFromFast",
            JSON.stringify({
              item: itemData,
            })
          );
        } else {
          $(this).effect("bounce", "slow");
        }
      } else {
        if (itemInventory === "main") {
          $(".menu-more").empty();
          $(".menu-more").css("top", e.clientY - 80 + "px");
          $(".menu-more").css("left", e.clientX - 40 + "px");
          $(".menu-more").append(`
                        <img src="./img/${itemData.name}.png" class="image-more">
                        <input type="number" class="control-input" id="count-more" value="1">
                        <button class="control-more-use" onclick="$.post('http://conde-b1g_inventory/UseItem', JSON.stringify(itemData)), $('.menu-more').hide(), closeInventory()">Sử dụng</button>
                        <div class="box-control"> 
                            <button class="control-more" id="give" onclick="$.post('http://conde-b1g_inventory/GetNearPlayers', JSON.stringify({
                                            number: parseInt($('#count-more').val()),
                                            item: itemData
                                        })), $('.menu-more').hide()">Gửi</button>
                            <button class="control-more" id="drop" onclick='$.post("http://conde-b1g_inventory/DropItem", JSON.stringify({

                                item: itemData,
                                number: parseInt($("#count-more").val())
                            })), $(".menu-more").hide()'>Vứt bỏ</button>
                        </div>`);
          $(".menu-more").show(50);
        } else if (itemInventory === "fast") {
          if (itemData.type == "item_weapon") {
            coisas[itemData.slot] = false;
            $.post(
              "http://conde-b1g_inventory/TakeFromFast",
              JSON.stringify({
                item: itemData,
              })
            );
          }
        } else if (itemData.name !== undefined) {
          $(this).effect("bounce", "slow");
        }
      }
    }
  });

  $("#drop").droppable({
    hoverClass: "hoverControl",
    drop: function (event, ui) {
      itemData = ui.draggable.data("item");

      //       if (itemData == undefined || itemData.canRemove == undefined) {
      //           return;
      //       }

      itemInventory = ui.draggable.data("inventory");

      //       if (itemInventory == undefined || itemInventory == "second") {
      //            return;
      //      }
      if (itemInventory === "fast") {
        return;
      }
      // if (itemData.canRemove) {
      $.post(
        "http://conde-b1g_inventory/DropItem",
        JSON.stringify({
          item: itemData,
          number: parseInt($("#count").val()),
        })
      );
      //}
    },
  });
  $("#playerInventory").droppable({
    drop: function (event, ui) {
      itemData = ui.draggable.data("item");
      itemInventory = ui.draggable.data("inventory");
      if (type === "trunk" && itemInventory === "second") {
        $(".requestNumber").empty();
        $(".requestNumber").append(`
                        <h2 class="conf-header">VUI LÒNG NHẬP SỐ LƯỢNG</h2>
                        <input type="number" class="control-input-conf" id="count-conf" value="${defaultvalue}">
                        <div class="box-conf">
                            <button class="control-conf" id="no" onclick='$(".requestNumber").hide()'>Hủy</button>
                            <button class="control-conf" id="yes" onclick='$.post("http://conde-b1g_inventory/TakeFromTrunk", JSON.stringify({
                                item: itemData,
                                number: parseInt($("#count-conf").val())
                            })), $(".requestNumber").hide(), defaultvalue = parseInt($("#count-conf").val())'>Xác nhận</button>
                        </div>
                `);
        $(".requestNumber").show();
      } else if (type === "property" && itemInventory === "second") {
        $(".requestNumber").empty();
        $(".requestNumber").append(`
                        <h2 class="conf-header">VUI LÒNG NHẬP SỐ LƯỢNG</h2>
                        <input type="number" class="control-input-conf" id="count-conf" value="${defaultvalue}">
                        <div class="box-conf">
                            <button class="control-conf" id="no" onclick='$(".requestNumber").hide()'>Hủy</button>
                            <button class="control-conf" id="yes" onclick='$.post("http://conde-b1g_inventory/TakeFromProperty", JSON.stringify({
                                item: itemData,
                                number: parseInt($("#count-conf").val()),
                                owner : ownerHouse
                            })), $(".requestNumber").hide(), defaultvalue = parseInt($("#count-conf").val())'>Xác nhận</button>
                        </div>
                `);
        $(".requestNumber").show();
      } else if (type === "Society" && itemInventory === "second") {
        $(".requestNumber").empty();
        $(".requestNumber").append(`
                        <h2 class="conf-header">VUI LÒNG NHẬP SỐ LƯỢNG</h2>
                        <input type="number" class="control-input-conf" id="count-conf" value="${defaultvalue}">
                        <div class="box-conf">
                            <button class="control-conf" id="no" onclick='$(".requestNumber").hide()'>Hủy</button>
                            <button class="control-conf" id="yes" onclick='$.post("http://conde-b1g_inventory/TakeFromSociety", JSON.stringify({
                                item: itemData,
                                number: parseInt($("#count-conf").val()),
                                owner : ownerHouse
                            })), $(".requestNumber").hide(), defaultvalue = parseInt($("#count-conf").val())'>Xác nhận</button>
                        </div>
                `);
        $(".requestNumber").show();
      } else if (type === "vault" && itemInventory === "second") {
        $.post(
          "http://conde-b1g_inventory/TakeFromVault",
          JSON.stringify({
            item: itemData,
            number: parseInt($("#count").val()),
          })
        );
      } else if (type === "player" && itemInventory === "second") {
        $.post(
          "http://conde-b1g_inventory/TakeFromPlayer",
          JSON.stringify({
            item: itemData,
            number: parseInt($("#count").val()),
          })
        );
      } else if (type === "normal" && itemInventory === "fast") {
        coisas[itemData.slot] = false;
        $.post(
          "http://conde-b1g_inventory/TakeFromFast",
          JSON.stringify({
            item: itemData,
          })
        );
      } else if (type === "shop" && itemInventory === "second") {
        $(".requestNumber").empty();
        $(".requestNumber").append(`
                        <h2 class="conf-header">VUI LÒNG NHẬP SỐ LƯỢNG</h2>
                        <input type="number" class="control-input-conf" id="count-conf" value="${defaultvalue}">
                        <div class="box-conf">
                            <button class="control-conf" id="no" onclick='$(".requestNumber").hide()'>Hủy</button>
                            <button class="control-conf" id="yes" onclick='$.post("http://conde-b1g_inventory/TakeFromShop", JSON.stringify({
                                item: itemData,
                                number: parseInt($("#count-conf").val())
                            })), $(".requestNumber").hide(), defaultvalue = parseInt($("#count-conf").val())'>Xác nhận</button>
                        </div>
                `);
        $(".requestNumber").show();
      } else if (type === "motels" && itemInventory === "second") {
        $.post(
          "http://conde-b1g_inventory/TakeFromMotel",
          JSON.stringify({
            item: itemData,
            number: parseInt($("#count").val()),
          })
        );
      } else if (type === "motelsbed" && itemInventory === "second") {
        $.post(
          "http://conde-b1g_inventory/TakeFromMotelBed",
          JSON.stringify({
            item: itemData,
            number: parseInt($("#count").val()),
          })
        );
      } else if (type === "glovebox" && itemInventory === "second") {
        $.post(
          "http://conde-b1g_inventory/TakeFromGlovebox",
          JSON.stringify({
            item: itemData,
            number: parseInt($("#count").val()),
          })
        );
      }
    },
  });

  $("#otherInventory").droppable({
    drop: function (event, ui) {
      itemData = ui.draggable.data("item");
      itemInventory = ui.draggable.data("inventory");

      if (type === "trunk" && itemInventory === "main") {
        $(".requestNumber").empty();
        $(".requestNumber").append(`
                        <h2 class="conf-header">VUI LÒNG NHẬP SỐ LƯỢNG</h2>
                        <input type="number" class="control-input-conf" id="count-conf" value="${defaultvalue}">
                        <div class="box-conf">
                            <button class="control-conf" id="no" onclick='$(".requestNumber").hide()'>Hủy</button>
                            <button class="control-conf" id="yes" onclick='$.post("http://conde-b1g_inventory/PutIntoTrunk", JSON.stringify({
                                item: itemData,
                                number: parseInt($("#count-conf").val())
                            })), $(".requestNumber").hide(), defaultvalue = parseInt($("#count-conf").val())'>Xác nhận</button>
                        </div>
                `);
        $(".requestNumber").show();
      } else if (type === "property" && itemInventory === "main") {
        $(".requestNumber").empty();
        $(".requestNumber").append(`
                        <h2 class="conf-header">VUI LÒNG NHẬP SỐ LƯỢNG</h2>
                        <input type="number" class="control-input-conf" id="count-conf" value="${defaultvalue}">
                        <div class="box-conf">
                            <button class="control-conf" id="no" onclick='$(".requestNumber").hide()'>Hủy</button>
                            <button class="control-conf" id="yes" onclick='$.post("http://conde-b1g_inventory/PutIntoProperty", JSON.stringify({
                                item: itemData,
                                number: parseInt($("#count-conf").val()),
                                owner : ownerHouse
                            })), $(".requestNumber").hide(), defaultvalue = parseInt($("#count-conf").val())'>Xác nhận</button>
                        </div>
                `);
        $(".requestNumber").show();
      } else if (type === "Society" && itemInventory === "main") {
        $(".requestNumber").empty();
        $(".requestNumber").append(`
                        <h2 class="conf-header">VUI LÒNG NHẬP SỐ LƯỢNG</h2>
                        <input type="number" class="control-input-conf" id="count-conf" value="${defaultvalue}">
                        <div class="box-conf">
                            <button class="control-conf" id="no" onclick='$(".requestNumber").hide()'>Hủy</button>
                            <button class="control-conf" id="yes" onclick='$.post("http://conde-b1g_inventory/PutIntoSociety", JSON.stringify({
                                item: itemData,
                                number: parseInt($("#count-conf").val()),
                                owner : ownerHouse
                            })), $(".requestNumber").hide(), defaultvalue = parseInt($("#count-conf").val())'>Xác nhận</button>
                        </div>
                `);
        $(".requestNumber").show();
      } else if (type === "vault" && itemInventory === "main") {
        $.post(
          "http://conde-b1g_inventory/PutIntoVault",
          JSON.stringify({
            item: itemData,
            number: parseInt($("#count").val()),
          })
        );
      } else if (type === "player" && itemInventory === "main") {
        $.post(
          "http://conde-b1g_inventory/PutIntoPlayer",
          JSON.stringify({
            item: itemData,
            number: parseInt($("#count").val()),
          })
        );
      } else if (type === "motels" && itemInventory === "main") {
        $.post(
          "http://conde-b1g_inventory/PutIntoMotel",
          JSON.stringify({
            item: itemData,
            number: parseInt($("#count").val()),
          })
        );
      } else if (type === "motelsbed" && itemInventory === "main") {
        $.post(
          "http://conde-b1g_inventory/PutIntoMotelBed",
          JSON.stringify({
            item: itemData,
            number: parseInt($("#count").val()),
          })
        );
      } else if (type === "glovebox" && itemInventory === "main") {
        $.post(
          "http://conde-b1g_inventory/PutIntoGlovebox",
          JSON.stringify({
            item: itemData,
            number: parseInt($("#count").val()),
          })
        );
      }
    },
  });
  $("#count").on("keypress keyup blur", function (event) {
    $(this).val(
      $(this)
        .val()
        .replace(/[^\d].+/, "")
    );
    if (event.which < 48 || event.which > 57) {
      event.preventDefault();
    }
  });
});

$.widget("ui.dialog", $.ui.dialog, {
  options: {
    // Determine if clicking outside the dialog shall close it
    clickOutside: false,
    // Element (id or class) that triggers the dialog opening
    clickOutsideTrigger: "",
  },
  open: function () {
    var clickOutsideTriggerEl = $(this.options.clickOutsideTrigger),
      that = this;
    if (this.options.clickOutside) {
      // Add document wide click handler for the current dialog namespace
      $(document).on(
        "click.ui.dialogClickOutside" + that.eventNamespace,
        function (event) {
          var $target = $(event.target);
          if (
            $target.closest($(clickOutsideTriggerEl)).length === 0 &&
            $target.closest($(that.uiDialog)).length === 0
          ) {
            that.close();
          }
        }
      );
    }
    // Invoke parent open method
    this._super();
  },
  close: function () {
    // Remove document wide click handler for the current dialog
    $(document).off("click.ui.dialogClickOutside" + this.eventNamespace);
    // Invoke parent close method
    this._super();
  },
});
