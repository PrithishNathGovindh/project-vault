import { useState, useMemo } from 'react';
import { Search, Upload, GraduationCap, User, LogOut, Trophy, Award, FileText, MessageSquare } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { ProjectCard } from '@/app/components/ProjectCard';
import { mockProjects, searchProjects, currentUser, ProjectSection } from '@/app/data/mockData';
import { getTotalUnreadCount } from '@/app/data/mockMessages';
import { Badge } from '@/app/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface HomePageProps {
  onProjectClick: (projectId: string) => void;
  onProfileClick: (userId: string) => void;
  onUploadClick: () => void;
  onMessagesClick: () => void;
  onLogout: () => void;
}

type TabSection = 'hackathon' | 'patent' | 'academic';

export function HomePage({ onProjectClick, onProfileClick, onUploadClick, onMessagesClick, onLogout }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('likes');
  const [activeTab, setActiveTab] = useState<TabSection>('hackathon');
  
  const unreadCount = getTotalUnreadCount(currentUser.id);

  const filteredProjects = useMemo(() => {
    let projects = searchQuery 
      ? searchProjects(searchQuery) 
      : mockProjects;

    // Filter by active tab
    if (activeTab === 'hackathon') {
      projects = projects.filter(p => p.section === 'Hackathon / Competition Winner');
    } else if (activeTab === 'patent') {
      projects = projects.filter(p => p.section === 'Patent Project');
    } else if (activeTab === 'academic') {
      projects = projects.filter(p => p.section === 'Academic / Final Year Project');
    }

    // Sort projects
    if (sortBy === 'likes') {
      projects = [...projects].sort((a, b) => b.likes - a.likes);
    } else if (sortBy === 'recent') {
      projects = [...projects].sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
    }

    return projects;
  }, [searchQuery, sortBy, activeTab]);

  const getTabCounts = () => {
    const allProjects = searchQuery ? searchProjects(searchQuery) : mockProjects;
    return {
      hackathon: allProjects.filter(p => p.section === 'Hackathon / Competition Winner').length,
      patent: allProjects.filter(p => p.section === 'Patent Project').length,
      academic: allProjects.filter(p => p.section === 'Academic / Final Year Project').length,
    };
  };

  const counts = getTabCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
}