# MEIS-lite

医療機器台帳管理システム [MEIS](https://github.com/sho-ce-engineer/MEIS) の機器台帳機能の一部を、実務を想定したモダンスタックの学習のために再実装したポートフォリオです。

>MEISは臨床工学技士として在籍していた医療機関で、開発・本番運用中のWebアプリです。
>※公開レポジトリと本番運用されているレポジトリは異なります。


MEIS-liteはその機器台帳機能に絞り、モノレポ構成・型安全なAPI設計・Server Componentによるデータフェッチなど、実務水準のスタックで実装しました。

---

## 技術スタック

| レイヤー          | 技術                                                |
| ------------- | ------------------------------------------------- |
| ランタイム         | Bun                                               |
| バックエンド        | Hono / Drizzle ORM / Zod                          |
| フロントエンド       | Next.js 16 (App Router) / React 19 / Tailwind CSS |
| データベース        | PostgreSQL (Neon)                                 |
| 構成            | モノレポ (Bun Workspaces)                             |
| Lint / Format | Biome                                             |
| テスト           | Vitest ※公開時未実施・未実装                                |

---

## 機能一覧

- 医療機器台帳の一覧表示
- 医療機器の新規登録
- 医療機器情報の更新
- 医療機器の削除

---

## ディレクトリ構成

```
meis-lite/
├ biome.json
├ tsconfig.base.json
├ package.json
└ packages/
   ├ api/          # Hono / Drizzle ORM
   └ web/          # Next.js App Router
```

---

## セットアップ

### 前提
- Bun がインストールされていること
- PostgreSQL接続先（Neonを推奨）

### 手順

```bash
# 依存関係インストール
bun install

# 環境変数設定（各.envファイルを開いてURLを設定してください）
cp packages/api/.env.example packages/api/.env.local
cp packages/web/.env.example packages/web/.env.local

# マイグレーション実行
cd packages/api
bunx drizzle-kit migrate

# テストデータ投入（任意）
bun run seed

# 起動（ターミナルを2つ使用・それぞれrootから実行）
cd packages/api && bun dev   # → http://localhost:3001
cd packages/web && bun dev   # → http://localhost:3000
```

---

## API仕様

| メソッド | エンドポイント | 説明 |
|---|---|---|
| GET | /equipments | 機器一覧取得 |
| GET | /equipments/:id | 機器1件取得 |
| POST | /equipments | 機器登録 |
| PATCH | /equipments/:id | 機器情報更新 |
| DELETE | /equipments/:id | 機器削除 |

---

## 設計上の判断

**スキーマ設計**
- `equipment_status`・`equipment_maintenance_contract` はvarcharにDBデフォルト値を設定。enumによるバリデーションはZod層で拡張可能な設計としてある。
- `updated_at` の自動更新は未実装。実務では`$onUpdate`等で対応予定。

**CORS**
- 現在は開発用に全オリジン開放。本番環境では`origin`を環境変数で制限すること。

**認証・施設コード**
- 現在はダミー値で固定。実務ではログインユーザーの認証情報から取得する設計を想定。

**型設計・指定**
- スタックに触れることを第一優先にしているため、型設計・指定等は一部のみ。

---

## TODO

- [ ] Hono RPCによるweb↔API間の型安全連携
- [ ] 認証機能の実装
- [ ] 絞り込みAPI（機器種別・メーカー・型番）
- [ ] `updated_at` 自動更新
- [ ] CORSの本番用origin制限

---

## 関連

- [MEIS](https://github.com/sho-ce-engineer/MEIS)— 本プロジェクトのベースとなった医療機器点検記録管理システム
