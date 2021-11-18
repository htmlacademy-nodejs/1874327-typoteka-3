// Получить список всех категорий
SELECT id, name FROM categories;

// Получить список категорий для которых создана минимум одна публикация
SELECT c.id, c.name
FROM categories c
INNER JOIN publications_categories pc
    ON pc.category_id = c.id
GROUP BY c.id;

// Получить список категорий с количеством публикаций
SELECT c.id, c.name, COUNT(pc.*) AS count
FROM categories c
LEFT JOIN publications_categories pc
	ON c.id = pc.category_id
GROUP BY c.id;

// Получить список публикаций
SELECT
	p.id, p.title, p.announce, p.created_at, u.first_name, u.last_name, u.email,
    COUNT(com.id) AS comments_count, STRING_AGG(DISTINCT c.name, ', ') AS categories
FROM publications p
INNER JOIN publications_categories pc
    ON pc.publication_id = p.id
INNER JOIN categories c
    ON c.id = pc.category_id
LEFT JOIN comments com
    ON com.publication_id = p.id
INNER JOIN users u
    ON u.id = p.user_id
GROUP BY p.id, u.id
ORDER BY p.created_at DESC;

// Получить полную информацию определённой публикации
SELECT
	p.id, p.title, p.announce, p.text, p.created_at, p.picture, u.first_name, u.last_name, u.email,
    COUNT(com.id) AS comments_count, STRING_AGG(DISTINCT c.name, ', ') AS categories
FROM publications p
INNER JOIN publications_categories pc
    ON pc.publication_id = p.id
INNER JOIN categories c
    ON c.id = pc.category_id
LEFT JOIN comments com
    ON com.publication_id = p.id
INNER JOIN users u
    ON u.id = p.user_id
WHERE p.id = 1
GROUP BY p.id, u.id;

// Получить список из 5 свежих комментариев
SELECT
	c.id, c.publication_id, u.first_name, u.last_name, c.text
FROM comments c
INNER JOIN users u
	ON u.id = c.user_id
ORDER BY c.created_at DESC
LIMIT 5;

// Получить список комментариев для определённой публикации
SELECT
	c.id, c.publication_id, u.first_name, u.last_name, c.text
FROM comments c
INNER JOIN users u
	ON u.id = c.user_id
WHERE
	c.publication_id = 1
ORDER BY c.created_at DESC;

// Обновить заголовок определённой публикации на «Как я встретил Новый год»
UPDATE publications
SET title = 'Как я встретил Новый год'
WHERE id = 1;
