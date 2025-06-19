# CLAUDE.md

## プロジェクト概要
TypeScript + React を使用した DDD アーキテクチャ採用のフルスタック Web アプリケーション開発用 starter kit です。  
Claude Code を活用した効率的な開発を前提としています。

## アーキテクチャ
- **アーキテクチャパターン**: Domain-Driven Design (DDD)
- **フロントエンド**: Next.js + TypeScript
- **バックエンド**: Node.js + TypeScript + Frourio + Fastify
- **データベース**: PostgreSQL (Docker)
- **ORM**: Prisma
- **テスト**: Vitest
- **API**: Frourio (型安全)

## ディレクトリ構造
```
fullstack-ddd-starter/
├── frontend/                     # Next.js アプリケーション
│   ├── src/
│   │   ├── components/           # 再利用可能UIコンポーネント
│   │   ├── pages/               # ページコンポーネント
│   │   ├── hooks/               # カスタムフック
│   │   ├── api/                 # API呼び出し (aspida client)
│   │   ├── types/               # フロントエンド固有型定義
│   │   └── utils/               # フロントエンド用ユーティリティ
│   └── package.json
│
├── backend/                      # DDD構成のバックエンド
│   ├── src/
│   │   ├── domain/              # ドメイン層 (ビジネスロジックの核心)
│   │   │   ├── entities/        # エンティティ (一意性を持つオブジェクト)
│   │   │   ├── values/          # 値オブジェクト (不変オブジェクト)
│   │   │   ├── services/        # ドメインサービス (エンティティに属さないロジック)
│   │   │   └── repositories/    # リポジトリインターフェース (データアクセス抽象化)
│   │   ├── application/         # アプリケーション層 (ユースケース実装)
│   │   │   ├── services/        # アプリケーションサービス (ユースケース調整)
│   │   │   ├── commands/        # コマンド (データ変更要求)
│   │   │   ├── queries/         # クエリ (データ取得要求)
│   │   │   └── dto/             # DTO (データ転送オブジェクト)
│   │   ├── infrastructure/      # インフラストラクチャ層 (技術的実装)
│   │   │   ├── repositories/    # リポジトリ実装 (Prisma使用)
│   │   │   ├── database/        # DB設定・接続
│   │   │   └── external/        # 外部API・サービス連携
│   │   ├── presentation/        # プレゼンテーション層 (UI/API)
│   │   │   └── api/             # Frourio API定義
│   │   └── shared/              # 共通モジュール
│   │       ├── errors/          # カスタムエラー定義
│   │       └── utils/           # 共通ユーティリティ
│   ├── prisma/
│   │   ├── schema.prisma        # Prismaスキーマ定義
│   │   └── migrations/          # マイグレーションファイル
│   ├── scripts/                 # ビルドスクリプト
│   └── tests/                   # テストファイル
│
├── packages/
│   └── shared/                  # フロントエンド・バックエンド共通
│       ├── types/              # 共通型定義
│       └── constants/          # 共通定数
│
├── docker/
│   └── docker-compose.yml      # PostgreSQL + Redis
│
└── scripts/                    # 開発・デプロイスクリプト
```

## 開発環境セットアップ

### 必要な環境
- Node.js 20.0.0 以上
- npm 9.0.0 以上
- Docker & Docker Compose
- Git

### 初回セットアップ
```bash
# 1. プロジェクトルートで依存関係をインストール
npm install

# 2. フロントエンドの依存関係をインストール
npm install --prefix frontend

# 3. バックエンドの依存関係をインストール
npm install --prefix backend

# 4. データベースを起動（プロジェクトルートから）
docker-compose up -d

# 5. バックエンドでデータベースセットアップ
npm run migrate:deploy --prefix backend

# 6. 開発サーバー起動（プロジェクトルートから）
npm run notios
```

### 開発サーバー起動
```bash
# プロジェクトルートから
npm run notios        # フロントエンド + バックエンド + 型生成を同時起動
npm run dev           # 上記と同じ（エイリアス）

# 個別起動
npm run dev:frontend  # フロントエンドのみ（Next.js）
npm run dev:backend   # バックエンドのみ（Frourio + Prisma）

# 型生成
npm run generate      # フロントエンド・バックエンド両方の型生成
npm run generate:frontend  # フロントエンドの型生成のみ
npm run generate:backend   # バックエンドの型生成のみ

```

### 開発サーバー起動後のアクセス
- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:8080
- Prisma Studio: `npx prisma studio` で起動

## Claude Code 開発ガイドライン

### 基本的な Claude Code の使い方
```bash
# プロジェクトのコンテキストを理解させる
claude code --context "このプロジェクトはDDDアーキテクチャを採用したTypeScript + Next.jsのフルスタックアプリです。CLAUDE.mdを参照してください。Node.js 20以上、Frourio、Prisma、aspidaを使用しています。"

# 開発開始
npm run notios  # フロントエンド + バックエンド同時起動

# 特定の機能開発
claude code "新しいUserエンティティを backend/src/domain/entities に作成してください。emailとnameを持つようにしてください。"

# テスト作成
claude code "UserEntityのテストをVitestで作成してください。"

# API作成
claude code "User作成のためのFrourio APIを backend/src/presentation/api に作成してください。"
```



### DDD実装のルール

#### エンティティ
- 一意性を持つオブジェクト
- 不変性を保つ
- ビジネスルールを内包
- ファクトリーメソッドで生成

#### 値オブジェクト
- 不変オブジェクト
- 等価性で比較
- バリデーションを内包
- primitiveの代わりに使用

#### ドメインサービス
- エンティティや値オブジェクトに属さないビジネスロジック
- ステートレス
- 他のドメインオブジェクトを操作

#### リポジトリ
- データアクセスの抽象化
- インターフェースをdomainに、実装をinfrastructureに
- ドメインオブジェクトを扱う

#### アプリケーションサービス
- ユースケースの実装
- ドメインオブジェクトの協調
- トランザクション管理

### テスト戦略

#### 単体テスト
```bash
# ドメインオブジェクトのテスト
claude code "User エンティティの単体テストを作成してください。不正な値での作成や、ビジネスルールの検証を含めてください。"

# アプリケーションサービスのテスト
claude code "UserApplicationService のテストを作成してください。モックリポジトリを使用してください。"
```

#### 統合テスト
```bash
# API テスト
claude code "User API の統合テストを作成してください。実際のデータベースを使用して、CRUD操作をテストしてください。"
```

### よく使用するコマンド

```bash
# 新機能開発
claude code "新しい[機能名]機能を実装してください。DDDの層を意識して実装してください。"

# リファクタリング
claude code "このコードをDDDの原則に従ってリファクタリングしてください。"

# バグ修正
claude code "この問題を修正してください。テストも更新してください。"

# ドキュメント更新
claude code "この機能のドキュメントを更新してください。"
```

### 開発フロー

1. **機能設計**
   - ドメインモデルの設計
   - ユースケースの整理

2. **ドメイン層実装**
   - エンティティ・値オブジェクト作成
   - ドメインサービス実装

3. **アプリケーション層実装**
   - アプリケーションサービス作成
   - DTO定義

4. **インフラストラクチャ層実装**
   - リポジトリ実装
   - 外部サービス連携

5. **プレゼンテーション層実装**
   - API作成（Frourio）
   - フロントエンド実装（Next.js）

6. **テスト実装**
   - 単体テスト
   - 統合テスト

### 型安全性の確保

#### Aspida による API型安全性
```bash
# APIクライアント型生成
npm run generate:aspida --prefix frontend

# バックエンドAPI型生成
npm run generate:aspida --prefix backend
npm run generate:frourio --prefix backend
```

#### Prisma による DB型安全性
```bash
# Prismaクライアント型生成
npm run generate:prisma --prefix backend

# マイグレーション実行
npm run migrate:deploy --prefix backend
```

## デプロイ

### 本番環境変数
```env
# データベース
DATABASE_URL="postgresql://user:password@host:5432/database"

# アプリケーション
NODE_ENV=production
PORT=8080
FRONTEND_URL=https://your-app.com

# 認証
JWT_SECRET=your-jwt-secret

# 外部サービス
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### デプロイコマンド
```bash
# ビルド（プロジェクトルートから）
npm run build  # フロントエンド・バックエンド両方ビルド

# フロントエンドのみビルド
npm run build --prefix frontend

# バックエンドのみビルド
npm run build --prefix backend

# データベースマイグレーション
npm run migrate:deploy --prefix backend
```

## トラブルシューティング

### よくある問題

#### 1. Docker コンテナが起動しない
```bash
# コンテナの状態確認
docker ps -a

# ログ確認
docker logs fullstack-postgres

# 再起動
docker-compose down && docker-compose up -d
```

#### 2. Prisma関連エラー
```bash
# スキーマ同期
npm run generate:prisma --prefix backend

# データベースリセット
npm run migrate:reset --prefix backend

# マイグレーション実行
npm run migrate:deploy --prefix backend
```

#### 3. 型エラー
```bash
# 型チェック（プロジェクトルートから）
npm run typecheck

# 個別型チェック
npm run typecheck:frontend
npm run typecheck:backend

# 型生成
npm run generate

```

#### 4. リントエラー
```bash
# リント・フォーマット
npm run lint          # 全体のリント実行
npm run lint:fix      # リント・フォーマットの自動修正

```


#### 5. aspida/Frourio 型生成エラー
```bash
# バックエンドの型生成
npm run generate:frourio --prefix backend
npm run generate:aspida --prefix backend

# フロントエンドの型生成
npm run generate:aspida --prefix frontend
```

### Claude Code でのデバッグ
```bash
# エラー調査
claude code "このエラーの原因と解決方法を教えてください: [エラーメッセージ]"

# コードレビュー
claude code "このコードに問題がないかレビューしてください。DDDの原則に従っているかもチェックしてください。"
```

## 参考資料
- [Domain-Driven Design](https://www.amazon.co.jp/dp/4798121967)
- [Clean Architecture](https://www.amazon.co.jp/dp/4048930656)
- [Frourio Documentation](https://frourio.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vitest Documentation](https://vitest.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [aspida Documentation](https://github.com/aspida/aspida)

## 更新履歴
- 2025-06-20 - 初版作成（Claude Code対応）