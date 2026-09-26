insert into public.categories (id, name, slug, sort_order, created_at) values
('82b05c94-af71-54b2-b729-058a5c6683d8', 'Professional portraits', 'professional-portraits', 0, '2026-09-20T12:29:01.544569+00:00'),
('97b81f65-f003-546f-a1c5-d9134324563e', 'Cinematic', 'cinematic', 1, '2026-09-20T12:29:00.131939+00:00'),
('b18c1468-db02-5d32-8223-3d34645081f8', 'Painting', 'painting', 2, '2026-09-20T12:29:01.107513+00:00'),
('45b6b9cc-8ec3-5fca-bef8-8f1630ee4e0d', 'Vintage', 'vintage', 2, '2026-09-20T12:29:00.673215+00:00'),
('d393b595-8d9e-5bad-be82-2f60ece23afb', 'Travel', 'travel', 3, '2026-09-20T12:29:03.760117+00:00')
on conflict do nothing;

insert into public.categories (id, name, slug, sort_order, created_at) values
('1d0c68da-32d8-5913-b5e3-6178ce0687bb', 'Anime', 'anime', 4, '2026-09-20T12:29:02.013958+00:00'),
('7063ddc4-1265-5926-ab2c-e72849d09677', 'Fantasy', 'fantasy', 4, '2026-09-20T12:29:02.875821+00:00'),
('2aeefdfc-961e-5bc5-a7f3-f734ac61c7df', '3D avatars', '3d-avatars', 5, '2026-09-20T12:29:02.433606+00:00'),
('e5fece9a-75be-5e1a-aae0-4ba1d210c8fc', 'Product and objects', 'product-and-objects', 5, '2026-09-20T12:29:04.176214+00:00'),
('9ae1d285-85dc-55af-af81-6d51c3be18cb', 'Pets', 'pets', 7, '2026-09-20T12:29:03.328484+00:00')
on conflict do nothing;
