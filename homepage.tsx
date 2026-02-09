import { useState, useMemo } from 'react';
              onClick={() => setActiveTab('academic')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'academic'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <FileText className="size-5" />
              <span>Projects</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'academic'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {counts.academic}
              </span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-600">
              Found <span className="text-gray-900">{filteredProjects.length}</span> project(s) matching "{searchQuery}"
            </p>
          </div>
        )}

        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="size-10 text-gray-400" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">
              {searchQuery 
                ? `No projects match "${searchQuery}". Try a different search term.`
                : 'No projects available yet. Be the first to upload!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => onProjectClick(project.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}