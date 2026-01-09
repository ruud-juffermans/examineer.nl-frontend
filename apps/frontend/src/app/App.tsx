import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';

// Public pages
import { LandingPage } from '@/app/pages/public/LandingPage';
import { LoginPage } from '@/app/pages/public/LoginPage';
import { RegisterPage } from '@/app/pages/public/RegisterPage';

// Teacher pages
import { TeacherDashboardPage } from '@/app/pages/teacher/TeacherDashboardPage';

// Student pages
import { StudentDashboardPage } from '@/app/pages/student/StudentDashboardPage';

// Layouts
import { DashboardLayout } from '@/app/layouts/DashboardLayout';
import { PublicLayout } from '@/app/layouts/PublicLayout';

function ProtectedRoute({
  children,
  allowedRoles
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Teacher routes */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <DashboardLayout role="teacher" />
          </ProtectedRoute>
        }
      >
        <Route index element={<TeacherDashboardPage />} />
        {/* More teacher routes will be added here */}
      </Route>

      {/* Student routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <DashboardLayout role="student" />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboardPage />} />
        {/* More student routes will be added here */}
      </Route>

      {/* Redirect based on role */}
      <Route
        path="/dashboard"
        element={
          user?.role === 'teacher' ? (
            <Navigate to="/teacher" replace />
          ) : user?.role === 'student' ? (
            <Navigate to="/student" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
