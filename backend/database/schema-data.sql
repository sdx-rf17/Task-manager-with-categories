/*
        adding testing data for database
*/


-- Insert sample categories
INSERT INTO categories (name, color) VALUES
('Work', '#3B82F6'),
('Personal', '#EF4444'),
('Health', '#10B981'),
('Learning', '#F59E0B'),
('Shopping', '#8B5CF6');

-- Insert sample tasks
INSERT INTO tasks (title, description, category_id, priority, due_date, is_completed) VALUES
('Finish project report', 'Complete the final report for Q3 project.', 1, 'high', '2025-10-05', 0),
('Buy groceries', 'Milk, eggs, bread, and veggies.', 5, 'medium', '2025-10-03', 1),
('Workout', 'Leg day at the gym.', 3, 'medium', '2025-10-04', 0),
('Read a book', 'Read 30 pages of a novel.', 2, 'low', '2025-10-10', 0),
('Prepare presentation', 'Slides for Monday’s team meeting.', 1, 'high', '2025-10-06', 0),
('Doctor appointment', 'Annual check-up at 9:00 AM.', 3, 'medium', '2025-10-07', 1),
('Meditate', '15 minutes of guided meditation.', 3, 'low', '2025-10-03', 0),
('Online course', 'Finish JavaScript module.', 4, 'medium', '2025-10-08', 0),
('Call parents', 'Weekly family catch-up call.', 2, 'low', '2025-10-04', 1),
('Submit tax documents', 'Upload documents to the portal.', 1, 'high', '2025-10-09', 0),
('Plan weekend trip', 'Research places and hotels.', 2, 'low', '2025-10-11', 0),
('Renew gym membership', 'Monthly renewal.', 3, 'medium', '2025-10-05', 1),
('Watch tutorial', 'Vue.js introduction video.', 4, 'low', '2025-10-06', 0),
('Team stand-up', 'Daily sync meeting.', 1, 'medium', '2025-10-03', 1),
('Laundry', 'Wash and fold clothes.', 2, 'low', '2025-10-04', 1),
('Complete assignment', 'Submit React homework.', 4, 'high', '2025-10-05', 0),
('Meal prep', 'Prepare meals for the week.', 3, 'medium', '2025-10-06', 1),
('Pay bills', 'Electricity and Internet.', 2, 'medium', '2025-10-07', 1),
('Organize workspace', 'Clean desk and files.', 1, 'low', '2025-10-08', 0);
