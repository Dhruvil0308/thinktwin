import React, { useState } from 'react';
import './index.css';


const Board = ({ lists, onCardMove }) => {
  const [draggingCard, setDraggingCard] = useState(null);

  return (
    <div className="flex gap-6 p-6 overflow-x-auto flex-1">
      {lists.map(list => (
        <div
          key={list.id}
          className="flex-shrink-0 w-72 bg-gray-50 rounded-lg"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            if (draggingCard) {
              onCardMove(draggingCard, list.id);
              setDraggingCard(null);
            }
          }}
        >
          <div className="p-3 bg-gray-100 rounded-t-lg border-b">
            <h3 className="font-medium text-gray-700 flex items-center justify-between">
              {list.title}
              <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {list.cards.length}
              </span>
            </h3>
          </div>
          <div className="p-3 space-y-3">
            {list.cards.map(card => (
              <div
                key={card.id}
                draggable
                onDragStart={() => setDraggingCard(card)}
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-800">{card.title}</h4>
                  {card.priority && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      card.priority === 'high' 
                        ? 'bg-red-50 text-red-600'
                        : card.priority === 'medium'
                        ? 'bg-yellow-50 text-yellow-600'
                        : 'bg-blue-50 text-blue-600'
                    }`}>
                      {card.priority}
                    </span>
                  )}
                </div>
                {card.description && (
                  <p className="text-xs text-gray-500 mb-2">{card.description}</p>
                )}
                {card.dueDate && (
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-2">📅</span>
                    {card.dueDate}
                  </div>
                )}
              </div>
            ))}
            <button className="w-full text-left text-sm text-gray-500 hover:text-gray-700 px-2 py-1 rounded">
              + Add a card
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [view, setView] = useState('login');
  const [activeAssistant, setActiveAssistant] = useState('mike');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [lists, setLists] = useState([
    {
      id: 1,
      title: 'To Do',
      cards: [
        {
          id: 1,
          title: 'Research React Hooks',
          description: 'Read documentation and create sample code',
          priority: 'high',
          dueDate: 'Oct 25'
        },
        {
          id: 2,
          title: 'Review Pull Request',
          description: 'Check latest code changes',
          priority: 'medium',
          dueDate: 'Oct 26'
        }
      ]
    },
    {
      id: 2,
      title: 'In Progress',
      cards: [
        {
          id: 3,
          title: 'Update Documentation',
          description: 'Add new API endpoints',
          priority: 'low',
          dueDate: 'Oct 27'
        }
      ]
    },
    {
      id: 3,
      title: 'Review',
      cards: []
    },
    {
      id: 4,
      title: 'Done',
      cards: [
        {
          id: 4,
          title: 'Setup Project',
          description: 'Initialize repository and configure tools',
          priority: 'high',
          dueDate: 'Oct 24'
        }
      ]
    }
  ]);

  const handleCardMove = (card, newListId) => {
    setLists(prevLists => {
      // Remove card from old list
      const updatedLists = prevLists.map(list => ({
        ...list,
        cards: list.cards.filter(c => c.id !== card.id)
      }));
      
      // Add card to new list
      const targetList = updatedLists.find(list => list.id === newListId);
      if (targetList) {
        targetList.cards.push(card);
      }
      
      return updatedLists;
    });
  };

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-500 mt-2">Sign in to your workspace</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              <button
                onClick={() => setView('main')}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-semibold">AI Task Board</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setView('main')}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => setView('settings')}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Settings
          </button>
          <button
            onClick={() => setView('support')}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Support
          </button>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 p-4 flex justify-between items-center text-white shadow-md">
          <div className="text-2xl font-bold">AI Task Board</div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveAssistant('mike')}
              className={`px-4 py-2 rounded-lg ${
                activeAssistant === 'mike'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              AI Mike
            </button>
            <button
              onClick={() => setActiveAssistant('donna')}
              className={`px-4 py-2 rounded-lg ${
                activeAssistant === 'donna'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              AI Donna
            </button>
            <button
              onClick={() => setView('login')}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-hidden flex">
          <Board lists={lists} onCardMove={handleCardMove} />
          {/* AI Chat Sidebar */}
          <div className="w-96 border-l border-gray-200 bg-white flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-medium text-gray-700">
                {activeAssistant === 'mike' ? 'AI Mike (Notes)' : 'AI Donna (Tasks)'}
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Ask ${activeAssistant === 'mike' ? 'Mike' : 'Donna'} for help...`}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    if (inputMessage.trim()) {
                      setMessages(prev => [...prev, {
                        id: Date.now(),
                        text: inputMessage,
                        sender: 'user'
                      }]);
                      setInputMessage('');
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
