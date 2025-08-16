import React from 'react';
import { Order } from '../types';
import { Clock, CheckCircle, Truck, Package, X } from 'lucide-react';

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

const statusIcons = {
  'pending': <Clock className="w-5 h-5" />,
  'confirmed': <CheckCircle className="w-5 h-5" />,
  'preparing': <Package className="w-5 h-5" />,
  'out-for-delivery': <Truck className="w-5 h-5" />,
  'delivered': <CheckCircle className="w-5 h-5" />,
  'cancelled': <X className="w-5 h-5" />
};

const statusColors = {
  'pending': 'text-yellow-600 bg-yellow-100',
  'confirmed': 'text-blue-600 bg-blue-100',
  'preparing': 'text-orange-600 bg-orange-100',
  'out-for-delivery': 'text-purple-600 bg-purple-100',
  'delivered': 'text-green-600 bg-green-100',
  'cancelled': 'text-red-600 bg-red-100'
};

export const OrderHistory: React.FC<OrderHistoryProps> = ({
  isOpen,
  onClose,
  orders
}) => {
  if (!isOpen) return null;

  const sortedOrders = [...orders].sort((a, b) => 
    new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl transform transition-transform">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
          <h2 className="text-2xl font-bold">Your Orders</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {sortedOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No orders yet</p>
              <p className="text-gray-400 text-sm">Your order history will appear here</p>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedOrders.map((order) => (
                <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Order #{order.id}</h3>
                      <p className="text-gray-500 text-sm">
                        {new Date(order.orderDate).toLocaleDateString()} at{' '}
                        {new Date(order.orderDate).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full flex items-center space-x-2 ${statusColors[order.status]}`}>
                      {statusIcons[order.status]}
                      <span className="text-sm font-medium capitalize">
                        {order.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-8 h-8 object-cover rounded"
                          />
                          <span>{item.name}</span>
                          <span className="text-gray-500">x{item.quantity}</span>
                        </div>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-600">Delivery Address</p>
                      <p className="text-sm font-medium">{order.deliveryAddress}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {order.status === 'out-for-delivery' && (
                    <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-purple-700">
                        <Truck className="w-5 h-5" />
                        <span className="font-medium">Your order is on the way!</span>
                      </div>
                      <p className="text-purple-600 text-sm mt-1">
                        Estimated delivery time: 15-20 minutes
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};