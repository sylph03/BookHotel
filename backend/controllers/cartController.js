const cartModel = require('../models/cartModel');

const addCart = (req, res) => {
    const cartData = req.body;

    cartModel.checkCartExistence(cartData.customer_id, cartData.room_id)
        .then(exists => {
            if (exists) {
                res.status(400).json({ error: 'Item already exists in the cart' });
            } else {
                return cartModel.addCart(cartData);
            }
        })
        .then(cartId => {
            if (cartId) {
                res.status(201).json({ cartId });
            }
        })
        .catch(err => {
            console.error('Error in addCart controller:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};

const deleteCartItemByCustomerAndRoom = (req, res) => {
    const { customerId, roomId } = req.params;

    cartModel.deleteCartItemByCustomerAndRoom(customerId, roomId)
        .then(affectedRows => { 
            if (affectedRows === 0) {
                res.status(404).json({ message: 'Cart item not found' });
            } else {
                res.status(200).json({ message: 'Cart item deleted', affectedRows });
            }
        })
        .catch(err => {
            console.error('Error in deleteCartItemByCustomerAndRoom controller:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};

const updateCartQuantityByCustomerAndRoom = (req, res) => {
    const { customerId, roomId } = req.params;
    const { quantity } = req.body;

    cartModel.updateCartQuantityByCustomerAndRoom(customerId, roomId, quantity)
        .then(affectedRows => {
            if (affectedRows > 0) {
                res.status(200).json({ message: 'Cart quantity updated successfully' });
            } else {
                res.status(404).json({ error: 'Cart item not found' });
            }
        })
        .catch(err => {
            console.error('Error in updateCartQuantityByCustomerAndRoom controller:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};  

const getCart = (req, res) => {
    const customerId = req.params.customerId;

    cartModel.getCart(customerId)
        .then(cartItems => {
            res.status(200).json(cartItems);
        })
        .catch(err => {
            console.error('Error fetching cart:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};

module.exports = {
    addCart,
    deleteCartItemByCustomerAndRoom,
    updateCartQuantityByCustomerAndRoom,
    getCart
};
