'use client';

type MenuItem = {
  id: string;
  label: string;
  icon: string;
};

type SidebarProps = {
  activeItem: string;
  onItemSelect: (itemId: string) => void;
};

export const Sidebar = ({ activeItem, onItemSelect }: SidebarProps) => {
  const menuItems: MenuItem[] = [];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-8">メニュー</h2>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onItemSelect(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeItem === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
