# Fullstack Template

TypeScript + React を使用した DDD アーキテクチャ採用のフルスタック Web アプリケーション開発用スターターキットです。

## 特徴

- 🏗️ **DDD (Domain-Driven Design)** アーキテクチャ
- ⚡ **関数型アプローチ** によるクリーンなコード
- 🔒 **型安全性** を重視した設計
- 🚀 **Claude Code** を活用した効率的な開発フロー
- 📦 **モノレポ構成** でフロントエンド・バックエンドを統合管理

## 技術スタック

### Frontend
- **Next.js** + TypeScript
- **React** 18
- **Tailwind CSS**
- **Vitest** (テスト)

### Backend
- **Node.js** + TypeScript
- **Frourio** (型安全API)
- **Fastify** (高速Webフレームワーク)
- **Prisma** (ORM)
- **PostgreSQL** (データベース)
- **Vitest** (テスト)
- **Magnito** (Cognito エミュレーター)

### Tools
- **Docker** + Docker Compose
- **ESLint** + Prettier
- **aspida** (型安全APIクライアント)

## クイックスタート

```bash
# リポジトリをクローン
git clone <repository-url>
cd fullstack-template

# 依存関係をインストール
npm install

# データベースを起動
docker-compose up -d

# 環境変数を設定
cp server/.env.example server/.env
cp client/.env.example client/.env

# データベースセットアップ
npm run migrate:deploy --prefix server

# 開発サーバーを起動
npm run notios
```

開発サーバー起動後のアクセス:
- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:8080
- Magnito管理画面: http://localhost:5051
- メール確認 (Inbucket): http://localhost:9000

## 開発コマンド

```bash
# 開発サーバー
npm run notios              # フロントエンド + バックエンド同時起動
npm run dev                 # 上記のエイリアス
npm run dev:client        # フロントエンドのみ
npm run dev:server         # バックエンドのみ

# ビルド
npm run build               # 全体ビルド
npm run build:client      # フロントエンドのみ
npm run build:server       # バックエンドのみ

# テスト
npm run test                # 全体テスト
npm run test:client       # フロントエンドのみ
npm run test:server        # バックエンドのみ

# 型チェック
npm run typecheck           # 全体型チェック
npm run typecheck:client  # フロントエンドのみ
npm run typecheck:server   # バックエンドのみ

# リント・フォーマット
npm run lint                # 全体リント
npm run lint:fix            # リント自動修正

# 型生成
npm run generate            # 全体型生成
npm run generate:client   # フロントエンドのみ
npm run generate:server    # バックエンドのみ
```

## アーキテクチャ

```
client/                   # Next.js アプリケーション
├── src/
│   ├── components/         # 再利用可能UIコンポーネント
│   ├── pages/             # ページコンポーネント
│   ├── hooks/             # カスタムフック
│   ├── api/               # API呼び出し (aspida client)
│   ├── types/             # フロントエンド固有型定義
│   └── utils/             # フロントエンド用ユーティリティ

server/                    # DDD構成のバックエンド
├── api/                   # Frourio API定義
│   ├── auth/              # 認証API
│   └── users/             # ユーザーAPI
├── domain/                # ドメイン層
│   ├── entities/          # ビジネスロジック関数
│   ├── schemas/           # 型定義
│   ├── validators/        # バリデーション関数
│   ├── services/          # ドメインサービス
│   └── repositories/      # リポジトリインターフェース
├── application/           # アプリケーション層
│   ├── services/          # ユースケース実装
│   ├── commands/          # コマンド
│   ├── queries/           # クエリ
│   └── dto/               # データ転送オブジェクト
├── infrastructure/        # インフラストラクチャ層
│   ├── repositories/      # リポジトリ実装
│   ├── database/          # DB設定・接続
│   └── external/          # 外部API・サービス連携
├── service/               # サービス設定
└── validators/            # API バリデーター
└── prisma/
    ├── schema.prisma      # Prismaスキーマ定義
    └── migrations/        # マイグレーションファイル
```

## DDD実装の特徴

### 関数型アプローチ
- クラスベースではなく関数型でDDDを実装
- 型定義は`schemas`ディレクトリに分離
- エンティティは純粋なビジネスロジック関数として実装
- 不変性を重視した設計

### トランザクション注入パターン
- リポジトリメソッドにPrismaトランザクションを注入
- データ整合性を保証
- テスタビリティの向上

### 認証システム
- **Magnito**: 開発環境でのCognito エミュレーション
- **型安全API**: Frourioによる認証エンドポイント
- **関数型バリデーション**: 純粋関数による入力検証

## Claude Code との連携

詳細な開発ガイドラインは [CLAUDE.md](./CLAUDE.md) を参照してください。

```bash
# 新機能開発例
claude code "新しいUserエンティティを server/src/domain/entities に作成してください"

# テスト作成例  
claude code "UserEntityの単体テストをVitestで作成してください"

# API作成例
claude code "User作成のためのFrourio APIを作成してください"
```

## ライセンス

MIT

---

詳細なドキュメントは [CLAUDE.md](./CLAUDE.md) をご覧ください。