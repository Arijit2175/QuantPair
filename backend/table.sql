create table strategy_results (
  id serial primary key,
  pair text,
  hedge_ratio float,
  position_size text,
  stop_loss float,
  take_profit float,
  risk_level text,
  performance jsonb,
  created_at timestamp with time zone default now()
);

alter table strategy_results enable row level security;