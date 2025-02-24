/*
  # Initial Schema Setup for Teacher Portal

  1. New Tables
    - `teachers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `full_name` (text)
      - `created_at` (timestamp)
      - `last_login` (timestamp)
      - `reset_token` (text, nullable)
      - `reset_token_expires` (timestamp, nullable)

    - `groups`
      - `id` (uuid, primary key)
      - `name` (text)
      - `teacher_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `active` (boolean)

    - `students`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text, unique)
      - `group_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `active` (boolean)

    - `attendance`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `group_id` (uuid, foreign key)
      - `date` (date)
      - `status` (text)
      - `created_at` (timestamp)
      - `created_by` (uuid, foreign key)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated teachers to:
      - Read and update their own data
      - Manage their groups
      - Manage students in their groups
      - Manage attendance for their groups
*/

-- Create teachers table
CREATE TABLE teachers (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz,
  reset_token text,
  reset_token_expires timestamptz,
  CONSTRAINT teachers_auth_user_fk FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
);

-- Create groups table
CREATE TABLE groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  teacher_id uuid NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  active boolean DEFAULT true,
  UNIQUE(name, teacher_id)
);

-- Create students table
CREATE TABLE students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  group_id uuid NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  active boolean DEFAULT true
);

-- Create attendance table
CREATE TABLE attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  group_id uuid NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  created_at timestamptz DEFAULT now(),
  created_by uuid NOT NULL REFERENCES teachers(id),
  UNIQUE(student_id, group_id, date)
);

-- Enable Row Level Security
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Teachers policies
CREATE POLICY "Teachers can read own data"
  ON teachers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Teachers can update own data"
  ON teachers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Groups policies
CREATE POLICY "Teachers can read own groups"
  ON groups
  FOR SELECT
  TO authenticated
  USING (teacher_id = auth.uid());

CREATE POLICY "Teachers can insert own groups"
  ON groups
  FOR INSERT
  TO authenticated
  WITH CHECK (teacher_id = auth.uid());

CREATE POLICY "Teachers can update own groups"
  ON groups
  FOR UPDATE
  TO authenticated
  USING (teacher_id = auth.uid());

-- Students policies
CREATE POLICY "Teachers can read students in their groups"
  ON students
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM groups
      WHERE groups.id = students.group_id
      AND groups.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can manage students in their groups"
  ON students
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM groups
      WHERE groups.id = students.group_id
      AND groups.teacher_id = auth.uid()
    )
  );

-- Attendance policies
CREATE POLICY "Teachers can read attendance for their groups"
  ON attendance
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM groups
      WHERE groups.id = attendance.group_id
      AND groups.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can manage attendance for their groups"
  ON attendance
  FOR ALL
  TO authenticated
  USING (created_by = auth.uid());

-- Create indexes for better performance
CREATE INDEX idx_groups_teacher_id ON groups(teacher_id);
CREATE INDEX idx_students_group_id ON students(group_id);
CREATE INDEX idx_attendance_student_id ON attendance(student_id);
CREATE INDEX idx_attendance_group_id ON attendance(group_id);
CREATE INDEX idx_attendance_date ON attendance(date);