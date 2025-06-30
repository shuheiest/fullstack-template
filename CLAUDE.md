# CLAUDE.md

## プロジェクト概要
TypeScript + React を使用した DDD アーキテクチャ採用のフルスタック Web アプリケーション開発用 starter kit です。  
**関数型プログラミング**のアプローチを採用し、Claude Code を活用した効率的な開発を前提としています。

### 関数型プロジェクトの特徴
- **イミュータブル（不変性）**: データの変更ではなく新しいオブジェクトを作成
- **純粋関数**: 副作用がなく、同じ入力に対して常に同じ出力を返す
- **関数合成**: 小さな関数を組み合わせて複雑な処理を構築
- **型安全性**: TypeScriptとZodによる厳密な型チェック
- **宣言的プログラミング**: 何をするかに焦点を当てた実装

## アーキテクチャ
- **アーキテクチャパターン**: Domain-Driven Design (DDD)
- **フロントエンド**: Next.js App Router + TypeScript + Tailwind CSS
- **バックエンド**: Node.js + TypeScript + Frourio + Fastify
- **データベース**: PostgreSQL (Docker)
- **認証**: Magnito (Cognito エミュレーター) + JWT検証
- **ORM**: Prisma
- **テスト**: Vitest
- **API**: Frourio (型安全)
- **スタイリング**: Tailwind CSS (ユーティリティファースト)

## ディレクトリ構造
```
fullstack-template/
├── client/                       # Next.js App Router アプリケーション
│   ├── app/                      # App Router ページ・レイアウト
│   ├── components/               # 再利用可能UIコンポーネント
│   ├── hooks/                    # カスタムフック
│   ├── api/                      # API呼び出し (aspida client)
│   ├── types/                    # フロントエンド固有型定義
│   ├── utils/                    # フロントエンド用ユーティリティ
│   └── package.json
│
├── server/                       # DDD構成のバックエンド
│   ├── api/                      # Frourio API定義
│   │   ├── auth/                 # 認証関連API
│   │   └── @types/               # 共有型定義
│   ├── domain/                  # ドメイン層 (ビジネスロジックの核心)
│   │   ├── entities/            # エンティティ (一意性を持つオブジェクト)
│   │   ├── schemas/             # ドメインスキーマ (型定義)
│   │   ├── values/              # 値オブジェクト (不変オブジェクト)
│   │   ├── services/            # ドメインサービス (エンティティに属さないロジック)
│   │   └── repositories/        # リポジトリインターフェース (データアクセス抽象化)
│   ├── application/             # アプリケーション層 (ユースケース実装)
│   │   ├── services/            # アプリケーションサービス (ユースケース調整)
│   │   ├── commands/            # コマンド (データ変更要求)
│   │   ├── queries/             # クエリ (データ取得要求)
│   │   └── dto/                 # DTO (データ転送オブジェクト)
│   ├── infrastructure/          # インフラストラクチャ層 (技術的実装)
│   │   ├── repositories/        # リポジトリ実装 (Prisma使用)
│   │   ├── database/            # DB設定・接続
│   │   └── external/            # 外部API・サービス連携
│   ├── shared/                  # 共通モジュール
│   │   ├── errors/              # カスタムエラー定義
│   │   └── utils/               # 共通ユーティリティ
│   ├── service/                 # サービス設定
│   ├── entrypoints/             # エントリーポイント
│   ├── prisma/
│   │   ├── schema.prisma        # Prismaスキーマ定義
│   │   └── migrations/          # マイグレーションファイル
│   ├── scripts/                 # ビルドスクリプト
│   ├── tests/                   # テストファイル
│   └── package.json
│
├── packages/
│   └── shared/                  # フロントエンド・バックエンド共通
│       ├── types/              # 共通型定義
│       └── constants/          # 共通定数
│
├── docker-compose.yml           # PostgreSQL
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
npm install --prefix client

# 3. バックエンドの依存関係をインストール
npm install --prefix server

# 4. 環境変数の準備
cp env.example .env --prefix client
cp env.example .env --prefix server

# 4. データベースを起動（プロジェクトルートから）
docker-compose up -d

# 5. バックエンドでデータベースセットアップ
npm run migrate:deploy --prefix server

# 6. 開発サーバー起動（プロジェクトルートから）
npm run notios
```

### 開発サーバー起動
```bash
# プロジェクトルートから
npm run notios        # フロントエンド + バックエンド + 型生成を同時起動

# 個別起動
npm run dev:client  # フロントエンドのみ（Next.js）
npm run dev:server   # バックエンドのみ（Frourio + Prisma）

# 型生成
npm run generate      # フロントエンド・バックエンド両方の型生成
npm run generate:client  # フロントエンドの型生成のみ
npm run generate:server   # バックエンドの型生成のみ

```

### テスト実行
```bash
# プロジェクトルートから
npm run test              # 全テスト実行
```

### 開発サーバー起動後のアクセス
- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:8080
- Magnito管理画面: http://localhost:5051
- メール確認 (Inbucket): http://localhost:9000
- Prisma Studio: `npx prisma studio` で起動

## Claude Code 開発ガイドライン

### 基本的な Claude Code の使い方
```bash
# プロジェクトのコンテキストを理解させる
claude code --context "このプロジェクトはDDDアーキテクチャを採用したTypeScript + Next.jsのフルスタックアプリです。CLAUDE.mdを参照してください。Node.js 20以上、Frourio、Prisma、aspidaを使用しています。"

# 開発開始
npm run notios  # フロントエンド + バックエンド同時起動

# 特定の機能開発
claude code "新しいUserエンティティを server/src/domain/entities に作成してください。emailとnameを持つようにしてください。"

# テスト作成
claude code "UserEntityのテストをVitestで作成してください。"

# API作成
claude code "User作成のためのFrourio APIを server/src/presentation/api に作成してください。"
```



### DDD実装のルール

#### 関数型アプローチ
- クラスベースではなく関数型でDDDを実装
- 型定義は `schemas` ディレクトリに分離
- エンティティは純粋なビジネスロジック関数として実装
- 不変性を重視した設計

#### エンティティ
- 一意性を持つオブジェクト
- 不変性を保つ
- ビジネスルールを内包
- ファクトリー関数で生成

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
- トランザクション注入パターンを採用

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
npm run generate:aspida --prefix client

# バックエンドAPI型生成
npm run generate:aspida --prefix server
npm run generate:frourio --prefix server
```

#### Prisma による DB型安全性
```bash
# Prismaクライアント型生成
npm run generate:prisma --prefix server

# マイグレーション実行
npm run migrate:deploy --prefix server
```

## デプロイ

### デプロイコマンド
```bash
# ビルド（プロジェクトルートから）
npm run build  # フロントエンド・バックエンド両方ビルド

# フロントエンドのみビルド
npm run build --prefix client

# バックエンドのみビルド
npm run build --prefix server

# データベースマイグレーション
npm run migrate:deploy --prefix server
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
npm run generate:prisma --prefix server

# データベースリセット
npm run migrate:reset --prefix server

# マイグレーション実行
npm run migrate:deploy --prefix server
```

#### 3. 型エラー
```bash
# 型チェック（プロジェクトルートから）
npm run typecheck

# 個別型チェック
npm run typecheck:client
npm run typecheck:server

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
npm run generate:frourio --prefix server
npm run generate:aspida --prefix server

# フロントエンドの型生成
npm run generate:aspida --prefix client
```

#### 6. WSL環境での注意点
- Node.js 20+が必要
- DockerとDocker Composeが必要
- 初回セットアップ時の個別起動も可能：
  ```bash
  npm run dev:client  # フロントエンド
  npm run dev:server  # バックエンド
  ```

### Claude Code でのデバッグ
```bash
# エラー調査
claude code "このエラーの原因と解決方法を教えてください: [エラーメッセージ]"

# コードレビュー
claude code "このコードに問題がないかレビューしてください。DDDの原則に従っているかもチェックしてください。"
```

## 認証システム

### Magnito (Cognito エミュレーター)

開発環境では AWS Cognito の代わりに Magnito を使用します。

```bash
# 認証関連サービスの起動確認
docker-compose ps

# Magnito ログ確認
docker-compose logs magnito

# メール確認 (Inbucket)
# http://localhost:9000 でメール受信を確認
```

### 認証API開発

```bash
# 新しい認証エンドポイント作成例
claude code "新しい認証API（パスワードリセット）を作成してください。ドメインバリデーション、UseCase、Frourio APIエンドポイントを含めてください。"

# 認証バリデーション拡張例
claude code "認証バリデーションに多要素認証の検証ロジックを追加してください。"
```

## 参考資料
- [Domain-Driven Design](https://www.amazon.co.jp/dp/4798121967)
- [Clean Architecture](https://www.amazon.co.jp/dp/4048930656)
- [Frourio Documentation](https://frourio.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vitest Documentation](https://vitest.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [aspida Documentation](https://github.com/aspida/aspida)


```

## 更新履歴
- 2025-06-21 - 関数型DDD実装、スキーマ分離、トランザクション注入パターン対応
- 2025-06-20 - 初版作成（Claude Code対応）