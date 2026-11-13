import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import SkipLink from './components/SkipLink.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import HomePage from './components/HomePage.jsx'
import AboutPage from './components/AboutPage.jsx'
import ProjectsPage from './components/ProjectsPage.jsx'
import ProjectDetailPage from './components/ProjectDetailPage.jsx'
import ContactPage from './components/ContactPage.jsx'
import BlogPage from './components/BlogPage.jsx'
import BlogPostPage from './components/BlogPostPage.jsx'
import AdminLoginPage from './components/AdminLoginPage.jsx'
import AdminResetPasswordPage from './components/AdminResetPasswordPage.jsx'
import AdminDashboardPage from './components/AdminDashboardPage.jsx'
import AdminPostsPage from './components/AdminPostsPage.jsx'
import AdminPostFormPage from './components/AdminPostFormPage.jsx'
import ProtectedAdminRoute from './components/ProtectedAdminRoute.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import PageMetadata from './components/PageMetadata.jsx'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <PageMetadata title="Itunuoluwa Adejimi | Student, Builder, Learner" description="Computer Science student and frontend developer learning by building practical digital projects." />
      <ScrollToTop />
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/reset-password" element={<AdminResetPasswordPage />} />
          <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboardPage /></ProtectedAdminRoute>} />
          <Route path="/admin/posts" element={<ProtectedAdminRoute><AdminPostsPage /></ProtectedAdminRoute>} />
          <Route path="/admin/posts/new" element={<ProtectedAdminRoute><AdminPostFormPage /></ProtectedAdminRoute>} />
          <Route path="/admin/posts/:id/edit" element={<ProtectedAdminRoute><AdminPostFormPage /></ProtectedAdminRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </BrowserRouter>
  )
}

export default App
