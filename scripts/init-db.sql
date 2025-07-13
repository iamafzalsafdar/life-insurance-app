CREATE TABLE IF NOT EXISTS recommendations (
    id SERIAL PRIMARY KEY,
    age INTEGER NOT NULL,
    income INTEGER NOT NULL,
    num_dependents INTEGER NOT NULL,
    risk_tolerance VARCHAR(10) NOT NULL,
    recommended_type VARCHAR(50) NOT NULL,
    recommended_coverage VARCHAR(50) NOT NULL,
    recommended_term VARCHAR(50) NOT NULL,
    explanation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
