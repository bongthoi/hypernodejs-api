'use strict';
var fs = require('fs');
var path = require('path');
const sleep = require('sleep');


var  Z2Blockchain  = {

    createOrderTemplate: function (_inbound)
    {
        _inbound.orderNumber = '';
        _inbound.amount = 0;
        _inbound.items = [];
        _inbound.status = JSON.stringify(this.orderStatus.Created);
        _inbound.created = new Date().toISOString();
        _inbound.cancelled = '';
        _inbound.ordered = '';
        _inbound.bought = '';
        _inbound.dateBackordered = '';
        _inbound.requestShipment = '';
        _inbound.delivered = '';
        _inbound.delivering = '';
        _inbound.disputeOpened = '';
        _inbound.disputeResolved = '';
        _inbound.orderRefunded = '';
        _inbound.paymentRequested = '';
        _inbound.paid = '';
        _inbound.approved = '';
        _inbound.dispute = '';
        _inbound.resolve = '';
        _inbound.backorder = '';
        _inbound.refund = '';
        _inbound.provider = '';
        _inbound.shipper = '';
        _inbound.financeCo = '';
        return(_inbound);
    },


    getVendor: function (_string, _vendorArray)
    {
        for (let each in _vendorArray)
            {for (let _prop in JSON.parse(_vendorArray[each]))
                {if (_prop === _string){return (JSON.parse(_vendorArray[each])[_string]);}}}
        return(-1);
    },

    getItem: function (_itemNo, _itemArray)
    {
        for (let each in _itemArray)
            { if (_itemArray[each].itemNo === _itemNo){return (_itemArray[each]);}}
        return({'description':'Item '+_itemNo+ 'Not Found', 'unitPrice': 0, 'extendedPrice': 0});
    },

    setItem: function (_itemNo, _qty, _itemArray)
    {
        for (let each in _itemArray)
            {if (_itemArray[each].itemNo === _itemNo) {_itemArray[each].quantity += _qty;} }
    },

    loadTransaction: function (_con, _item, _id, businessNetworkConnection)
    {
        return businessNetworkConnection.submitTransaction(_item)
        .then(() => {
            console.log('loadTransaction: order '+_id+' successfully added'); 
            _con.sendUTF('loadTransaction: order '+_id+' successfully added');
        })
        .catch((error) => {
            if (error.message.search('MVCC_READ_CONFLICT') != -1)
                {sleep.sleep(5);
                    console.log(_id+" loadTransaction retrying submit transaction for: "+_id);
                    this.loadTransaction(_con,_item, _id, businessNetworkConnection);
                }
            });
    },

    addOrder: function (_con, _order, _registry, _createNew, _bnc)
    {
        return _registry.add(_order)
        .then(() => {
            this.loadTransaction(_con,_createNew, _order.orderNumber, _bnc);
        })
        .catch((error) => {
        if (error.message.search('MVCC_READ_CONFLICT') != -1)
            {console.log(_order.orderNumber+" addOrder retrying assetRegistry.add for: "+_order.orderNumber);
            this.addOrder(_con,_order, _registry, _createNew, _bnc);
            }
            else {console.log('error with assetRegistry.add', error)}
        });
    },

    saveMemberTable: function (_table)
    {
        let options = { flag : 'w' };
        let newFile = path.join(path.dirname(require.main.filename),'startup','memberList.txt');
        let _mem = '{"members": [';
        for (let each in _table)
            {(function(_idx, _arr)
                {if(_idx>0){_mem += ', ';} _mem +=JSON.stringify(_arr[_idx]);})(each, _table)}
        _mem += ']}';
        fs.writeFileSync(newFile, _mem, options);
    },

    saveItemTable: function (_table)
    {
        let options = { flag : 'w' };
        let newFile = path.join(path.dirname(require.main.filename),'startup','itemList.txt');
        let _mem = '{"items": [';
        for (let each in _table)
            {(function(_idx, _arr){if(_idx>0){_mem += ', ';} _mem += JSON.stringify(_arr[_idx]);})(each, _table)}
        _mem += ']}';
        fs.writeFileSync(newFile, _mem, options);
    },

    addItems: function (_inbound, _itemTable)
    {
        let _amount = 0;
        let _items = [];
        let _this = this;
        for (let each in _inbound.items)
            {(function(_idx, _arr)
                {
                    let _item = _this.getItem(_arr[_idx].itemNo, _itemTable);
                    _this.setItem(_arr[_idx].itemNo, _arr[_idx].quantity, _itemTable);
                    _arr[_idx].description = _item.itemDescription;
                    _arr[_idx].unitPrice = _item.unitPrice;
                    _arr[_idx].extendedPrice = _item.unitPrice*_arr[_idx].quantity;
                    _amount += _arr[_idx].extendedPrice;
                    _items.push(JSON.stringify(_arr[_idx]));
                })(each, _inbound.items)}
        return ({'items': _items, 'amount': _amount});
    },

    getOrderData: function (_order)
    {
        let orderElements = ['items', 'status', 'amount', 'created', 'cancelled', 'bought', 'ordered', 'dateBackordered', 'requestShipment', 'delivered', 'delivering', 'approved',
        'disputeOpened', 'disputeResolved', 'paymentRequested', 'orderRefunded', 'paid', 'dispute', 'resolve', 'backorder', 'refund'];
        var _obj = {};
        for (let each in orderElements){(function(_idx, _arr)
        { _obj[_arr[_idx]] = _order[_arr[_idx]]; })(each, orderElements)}
        _obj.buyer = _order.buyer.$identifier;
        _obj.seller = _order.seller.$identifier;
        _obj.provider = _order.seller.$provider;
        _obj.shipper = _order.seller.$shipper;
        _obj.financeCo = _order.seller.$financeCo;
        return (_obj);
    },


    orderStatus: {
        Created: {code: 1, text: 'Order Created'},
        Bought: {code: 2, text: 'Order Purchased'},
        Cancelled: {code: 3, text: 'Order Cancelled'},
        Ordered: {code: 4, text: 'Order Submitted to Provider'},
        ShipRequest: {code: 5, text: 'Shipping Requested'},
        Delivered: {code: 6, text: 'Order Delivered'},
        Delivering: {code: 15, text: 'Order being Delivered'},
        Backordered: {code: 7, text: 'Order Backordered'},
        Dispute: {code: 8, text: 'Order Disputed'},
        Resolve: {code: 9, text: 'Order Dispute Resolved'},
        PayRequest: {code: 10, text: 'Payment Requested'},
        Authorize: {code: 11, text: 'Payment Approved'},
        Paid: {code: 14, text: 'Payment Processed'},
        Refund: {code: 12, text: 'Order Refund Requested'},
        Refunded: {code: 13, text: 'Order Refunded'}
    }


}

module.exports = Z2Blockchain;