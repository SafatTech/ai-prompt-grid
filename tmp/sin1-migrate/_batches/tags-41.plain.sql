insert into public.tags (id, name, slug, kind, created_at) values
('75a8dd83-6dcf-5875-b0b6-3f9db799d443', 'Artistic restyle', 'intent-artistic-restyle', 'intent', '2026-09-20T12:29:16.88813+00:00'),
('f72aed36-5048-5f27-b0bd-8781e9bf413f', 'Change background', 'intent-change-background', 'intent', '2026-09-20T12:29:26.146133+00:00'),
('89644fd6-d7a4-596d-a24e-991ef85bda79', 'Change lighting', 'intent-change-lighting', 'intent', '2026-09-20T12:29:07.584958+00:00'),
('0aa2d3a4-b45f-5840-b70d-4c64b198624c', 'ChatGPT Image', 'tool-chatgpt-image', 'tool', '2026-09-20T12:29:08.417309+00:00'),
('eb16ed75-1e0c-5ad4-8bd0-9d285312a997', 'Flux', 'tool-flux', 'tool', '2026-09-20T12:29:36.866574+00:00')
on conflict do nothing;

insert into public.tags (id, name, slug, kind, created_at) values
('bcd45ba0-de01-54cd-9f62-e6ddc2f6d1be', 'Full scene transformation', 'intent-full-scene-transformation', 'intent', '2026-09-20T12:29:31.354608+00:00'),
('83f5177c-bf1d-53a1-aa94-9fc2a28f6297', 'Gemini', 'tool-gemini', 'tool', '2026-09-20T12:29:13.081572+00:00'),
('e63c761f-26c0-598b-9ec6-a38a2cf88081', 'Group', 'subject-group', 'subject', '2026-09-20T12:29:16.031543+00:00'),
('a1d17d4f-5e68-525e-85ee-53bc87a1f989', 'New outfit or theme', 'intent-new-outfit-or-theme', 'intent', '2026-09-20T12:29:41.361278+00:00'),
('793aa330-509e-5c51-8353-bd2f343bea70', 'Other AI editor', 'tool-other-ai-editor', 'tool', '2026-09-20T12:29:22.349473+00:00')
on conflict do nothing;

insert into public.tags (id, name, slug, kind, created_at) values
('2158f8fd-4d0f-5b9f-8828-dca0347e0f59', 'Person', 'subject-person', 'subject', '2026-09-20T12:29:06.746736+00:00'),
('bfcc625d-f380-56bf-a65f-f1a07b90fac0', 'Pet', 'subject-pet', 'subject', '2026-09-20T12:29:45.194801+00:00'),
('631b10af-d1a7-5377-9e75-00afa0782c8b', 'Place', 'subject-place', 'subject', '2026-09-20T12:29:50.142211+00:00'),
('35d50ebd-4746-54d2-a24e-fa6c897f2b60', 'Product or object', 'subject-product-or-object', 'subject', '2026-09-20T12:29:59.546507+00:00')
on conflict do nothing;