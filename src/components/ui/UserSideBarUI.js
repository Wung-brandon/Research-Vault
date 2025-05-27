// components/ui/UserSidebar.js

import { Calendar, Book, MessageSquare, Clock, Check, X } from 'lucide-react';

export default function UserSidebar({ userData }) {
  // Format date to display in more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-full p-4 sticky top-4">
      {/* User Profile */}
      <div className="text-center mb-6">
        <h3 className="font-bold text-lg">{userData.name}</h3>
        <p className="text-gray-600">{userData.department}</p>
        <p className="text-gray-500 text-sm">{userData.email}</p>
      </div>
      
      {/* Research Info */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
          <Book className="h-4 w-4 mr-2" />
          Research Project
        </h4>
        <p className="text-sm font-medium mb-2">{userData.researchTitle}</p>
        
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-1">Supervisors:</p>
          <ul className="text-sm">
            {userData.supervisors.map((supervisor, index) => (
              <li key={index} className="mb-1">{supervisor}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Research Progress */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Research Progress
        </h4>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${userData.progress.proposalSubmission ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
              {userData.progress.proposalSubmission ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </div>
            <span className="ml-3 text-sm">Proposal Submission</span>
          </div>
          
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${userData.progress.preDefense ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
              {userData.progress.preDefense ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </div>
            <span className="ml-3 text-sm">Pre-Defense</span>
          </div>
          
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${userData.progress.defense ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
              {userData.progress.defense ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </div>
            <span className="ml-3 text-sm">Defense</span>
          </div>
          
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${userData.progress.finalSubmission ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
              {userData.progress.finalSubmission ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </div>
            <span className="ml-3 text-sm">Final Submission</span>
          </div>
        </div>
      </div>
      
      {/* Upcoming Deadlines */}
      {userData.deadlines && userData.deadlines.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Upcoming Deadlines
          </h4>
          
          <div className="space-y-2">
            {userData.deadlines.map((deadline, index) => (
              <div key={index} className="bg-blue-50 p-2 rounded border border-blue-100">
                <p className="text-sm font-medium">{deadline.title}</p>
                <p className="text-xs text-gray-600">{formatDate(deadline.date)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Recent Feedback */}
      {userData.feedback && userData.feedback.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Recent Feedback
          </h4>
          
          <div className="space-y-3">
            {userData.feedback.map((item, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs font-medium">{item.from}</p>
                  <p className="text-xs text-gray-500">{formatDate(item.date)}</p>
                </div>
                <p className="text-sm">{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}