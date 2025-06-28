import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'フルスタックテンプレート',
  description: 'DDDアーキテクチャを採用した認証システム',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
