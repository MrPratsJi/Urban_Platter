import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { X, Send, Bot, User } from 'lucide-react';

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const botResponses = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    response: "Hi there! I'm Prata, your friendly food assistant! 🍕 I'm here to help you with menu recommendations, order status, and any questions about our delicious food at Urban Platter. What can I help you with today?"
  },
  {
    keywords: ['menu', 'food', 'dishes', 'what do you have'],
    response: "We have an amazing variety! 🌟 Our menu includes:\n\n🍕 Pizza - Classic Margherita, Pepperoni, BBQ Chicken\n🍔 Burgers - Beef, Veggie, Chicken Deluxe\n🍛 Indian - Butter Chicken, Palak Paneer, Biryani\n🥢 Chinese - Sweet & Sour, Fried Rice, Kung Pao\n🍰 Desserts - Brownies, Tiramisu, Fruit Tarts\n\nWhat sounds good to you?"
  },
  {
    keywords: ['recommend', 'suggestion', 'popular', 'best'],
    response: "Great question! 🌟 Here are my top recommendations:\n\n🔥 Most Popular: Butter Chicken (4.9⭐) - Our customers absolutely love this creamy, flavorful dish!\n\n🍕 Pizza Lover's Choice: BBQ Chicken Pizza (4.6⭐) - Perfect blend of smoky BBQ and tender chicken\n\n🥗 Healthy Option: Veggie Deluxe Burger (4.3⭐) - Delicious and nutritious!\n\nAll come with our signature sides. What type of cuisine are you in the mood for?"
  },
  {
    keywords: ['delivery', 'time', 'how long', 'fast'],
    response: "We pride ourselves on speedy delivery! 🚀\n\n⏱️ Average delivery time: 25-35 minutes\n🍕 Pizza & Burgers: 15-25 minutes\n🍛 Indian & Chinese: 20-30 minutes\n🍰 Desserts: 10-15 minutes\n\n📍 Free delivery on orders over $25\n🛵 Real-time tracking available\n\nWe're currently delivering to your area with no delays!"
  },
  {
    keywords: ['price', 'cost', 'expensive', 'cheap', 'affordable'],
    response: "Our prices are very competitive! 💰\n\n🍕 Pizza: $12.99 - $18.99\n🍔 Burgers: $10.99 - $13.99\n🍛 Indian dishes: $13.99 - $17.99\n🥢 Chinese: $11.99 - $16.99\n🍰 Desserts: $7.99 - $9.99\n\n💸 Current offers:\n- Free delivery on orders $25+\n- 15% off on your first order\n- Student discount: 10% with valid ID"
  },
  {
    keywords: ['vegan', 'vegetarian', 'veg', 'plant based'],
    response: "Absolutely! We have fantastic vegetarian options! 🌱\n\n✅ Vegetarian dishes:\n🍕 Margherita Pizza\n🍔 Veggie Deluxe Burger\n🍛 Palak Paneer\n🥢 Vegetable Fried Rice\n🍰 All our desserts\n\nAll marked with a green leaf icon 🌿 on our menu. Many can be made vegan upon request - just mention it in your order notes!"
  },
  {
    keywords: ['spicy', 'hot', 'mild', 'heat level'],
    response: "We love spice lovers! 🌶️\n\n🔥 Spice levels available:\n- Mild 🌶️ (Perfect for everyone)\n- Medium 🌶️🌶️ (Nice kick!)\n- Hot 🌶️🌶️🌶️ (Bring the heat!)\n- Extra Hot 🌶️🌶️🌶️🌶️ (For spice champions!)\n\n🍛 Spiciest dishes:\n- Kung Pao Chicken\n- Spicy Indian Curry options\n- Hot Wings (ask about adding them!)\n\nJust specify your preferred spice level when ordering!"
  },
  {
    keywords: ['payment', 'pay', 'card', 'cash', 'razorpay'],
    response: "Multiple payment options available! 💳\n\n✅ Accepted payments:\n- Credit/Debit Cards (Visa, MasterCard, Amex)\n- Digital Wallets (PayPal, Apple Pay, Google Pay)\n- Razorpay gateway (100% secure)\n- Cash on Delivery (COD) available\n- UPI payments\n\n🔐 All transactions are encrypted and secure. Your financial information is completely protected!"
  },
  {
    keywords: ['order status', 'track', 'where is my order', 'tracking'],
    response: "You can easily track your order! 📱\n\n🔍 Order tracking:\n- Check the 'Orders' tab in your account\n- Real-time status updates\n- SMS notifications at each stage\n- Estimated delivery time\n\n📋 Order stages:\n1. Order Confirmed ✅\n2. Preparing 👨‍🍳\n3. Out for Delivery 🛵\n4. Delivered 🎉\n\nIf you need immediate help with an order, just share your order number!"
  },
  {
    keywords: ['cancel', 'refund', 'problem', 'issue'],
    response: "I'm here to help resolve any issues! 🛠️\n\n❌ Order cancellation:\n- Free cancellation within 2 minutes of placing order\n- Partial charges may apply after preparation starts\n\n💰 Refunds:\n- Full refund for order issues\n- Processed within 3-5 business days\n- Quality issues: Replacement or full refund\n\n📞 Need immediate assistance?\n- Use our 24/7 customer support\n- Live chat available\n- Call: 1-800-FOODIE"
  },
  {
    keywords: ['thanks', 'thank you', 'appreciate'],
    response: "You're very welcome! 😊 I'm always happy to help make your food experience amazing! \n\nIs there anything else you'd like to know about our menu, delivery, or services? I'm here to make sure you get exactly what you're craving! 🍴✨"
  }
];

const defaultResponse = "I'd love to help you with that! 🤔 I can assist you with:\n\n🍽️ Menu recommendations\n⏰ Delivery information\n💰 Pricing and offers\n🌱 Dietary preferences\n📱 Order tracking\n💳 Payment options\n\nCould you please be more specific about what you'd like to know? I'm here to make your food experience perfect! 😊";

export const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm Prata, your AI food assistant! 🤖🍕 I'm here to help you with menu recommendations, order information, and answer any questions about our delicious food. How can I make your day tastier?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const response of botResponses) {
      if (response.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return response.response;
      }
    }
    
    return defaultResponse;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold">Prata AI Assistant</h3>
            <p className="text-xs opacity-90">Your food companion</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.isUser
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-start space-x-2">
                {!message.isUser && (
                  <Bot className="w-4 h-4 mt-1 text-purple-600" />
                )}
                {message.isUser && (
                  <User className="w-4 h-4 mt-1 text-white order-2" />
                )}
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 opacity-70`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-2xl">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-purple-600" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about food..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-2 rounded-full hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};