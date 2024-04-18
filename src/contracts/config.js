export const rawMaterialsInfoAddress = "0x85e90DbaF73B638888c947cFd57d7CF4D5AD2fD3";
export const rawMaterialsInfoABI = [{"inputs":[{"internalType":"address","name":"_rawMaterialsManagementAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getAllMaterialIds","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_materialId","type":"uint256"}],"name":"getMaterialInfo","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"string","name":"details","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMaterialsInfo","outputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"string[]","name":"names","type":"string[]"},{"internalType":"uint256[]","name":"quantities","type":"uint256[]"},{"internalType":"string[]","name":"detailsList","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rawMaterialsManagement","outputs":[{"internalType":"contract IRawMaterialsManagement","name":"","type":"address"}],"stateMutability":"view","type":"function"}]; 

export const ordersManagementAddress = "0xCAc3820D4a45B146685467460b9A6473C21d74fE";
export const ordersManagementABI = [{"inputs":[{"internalType":"address","name":"_rawMaterialsManagementAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"orderId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"materialId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"quantity","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"traceabilityId","type":"uint256"}],"name":"OrderPlaced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"orderId","type":"uint256"},{"indexed":false,"internalType":"enum OrdersManagement.OrderStatus","name":"status","type":"uint8"}],"name":"OrderProcessed","type":"event"},{"inputs":[],"name":"getAllOrders","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"address[]","name":"","type":"address[]"},{"internalType":"enum OrdersManagement.OrderStatus[]","name":"","type":"uint8[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_orderId","type":"uint256"}],"name":"getOrder","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"},{"internalType":"enum OrdersManagement.OrderStatus","name":"","type":"uint8"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myTraceabilityIds","outputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"orders","outputs":[{"internalType":"uint256","name":"materialId","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"address","name":"requester","type":"address"},{"internalType":"enum OrdersManagement.OrderStatus","name":"status","type":"uint8"},{"internalType":"uint256","name":"traceabilityId","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_materialId","type":"uint256"},{"internalType":"uint256","name":"_quantity","type":"uint256"}],"name":"placeOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_orderId","type":"uint256"},{"internalType":"bool","name":"_accept","type":"bool"}],"name":"processOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rawMaterialsManagement","outputs":[{"internalType":"contract IRawMaterialsManagement","name":"","type":"address"}],"stateMutability":"view","type":"function"}]; 

export const ManufacturerInventoryAddress = "0x2252B914924a7a20B3937a76ac81491235bff3EE";
export const ManufacturerInventoryABI = [{"inputs":[{"internalType":"address","name":"_ordersManagementAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getAllMyOrders","outputs":[{"internalType":"uint256[]","name":"myMaterialIds","type":"uint256[]"},{"internalType":"uint256[]","name":"myQuantities","type":"uint256[]"},{"internalType":"uint256[]","name":"myStatusValues","type":"uint256[]"},{"internalType":"uint256[]","name":"myOrderIds","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manufacturerAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ordersManagement","outputs":[{"internalType":"contract OrdersManagement","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_orderId","type":"uint256"}],"name":"viewMyOrderStatus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

export const inventoryContractAddress = '0xcE7a2BB945b58d3De23ED88f5e9e369c2362c734'; 
export const inventoryContractABI = [{"inputs":[{"internalType":"address","name":"_ordersManagementAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"inventory","outputs":[{"internalType":"uint256","name":"materialId","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manufacturerAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ordersManagement","outputs":[{"internalType":"contract OrdersManagement","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_orderId","type":"uint256"}],"name":"receiveOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"viewInventory","outputs":[{"components":[{"internalType":"uint256","name":"materialId","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"}],"internalType":"struct Inventory.InventoryItem[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"}]; 

export const rawMaterialsManagementABI = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"string","name":"details","type":"string"}],"name":"addRawMaterial","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"materialId","type":"uint256"}],"name":"deleteRawMaterial","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getAllMaterialIds","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"materialId","type":"uint256"}],"name":"getRawMaterial","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextMaterialId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rawMaterials","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"string","name":"details","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"materialId","type":"uint256"},{"internalType":"string","name":"newName","type":"string"},{"internalType":"uint256","name":"newQuantity","type":"uint256"},{"internalType":"string","name":"newDetails","type":"string"}],"name":"updateRawMaterial","outputs":[],"stateMutability":"nonpayable","type":"function"}]; // RawMaterialsManagement的合约ABI
  
export const rawMaterialsManagementAddress = '0x479296F16d448f89B899746057901BDd55097Dc8'; 

 