"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { getUsers, getSubjects, addSampleSubjects, type Subject } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SupabaseSetupChecker } from "@/components/supabase-setup-checker";

interface UserData {
  id: string;
  email: string;
  created_at: string;
}

interface ApiError {
  message: string;
  status: number;
  details?: unknown;
}

interface UserApiResponse {
  success: boolean;
  data?: UserData[];
  error?: ApiError;
}

interface SubjectApiResponse {
  success: boolean;
  data?: Subject[];
  error?: ApiError;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [subjectsError, setSubjectsError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      
      try {
        // Load users
        const userResult = await getUsers() as UserApiResponse;
        
        if (userResult.success && userResult.data) {
          setUsers(userResult.data);
          setError(null);
          setErrorDetails(null);
        } else if (userResult.error) {
          setError({
            message: userResult.error.message || "Failed to load users. Please check your Supabase configuration.",
            status: userResult.error.status || 500,
            details: userResult.error.details
          });
          setErrorDetails(
            typeof userResult.error.details === 'object' 
              ? JSON.stringify(userResult.error.details, null, 2) 
              : String(userResult.error.details)
          );
        }

        // Load subjects and add sample data if needed
        try {
          await addSampleSubjects();
          const subjectResult = await getSubjects() as SubjectApiResponse;
          
          if (subjectResult.success && subjectResult.data) {
            setSubjects(subjectResult.data);
          } else if (subjectResult.error) {
            setSubjectsError(subjectResult.error.message || "Failed to load subjects.");
          }
        } catch (subjectError) {
          setSubjectsError("Failed to load or create subjects. Please check your Supabase configuration.");
          console.error("Subject loading error:", subjectError);
        }
      } catch (err) {
        setError({
          message: "An error occurred while connecting to Supabase. Please check your configuration.",
          status: 500,
          details: err instanceof Error ? err.message : 'Unknown error'
        });
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-36 pb-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Subscribed Users</h1>
          <Link href="/">
            <Button className="bg-[#FFA500] hover:bg-[#FF9000] text-white">
              Back to Home
            </Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFA500]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
            <p className="font-medium">{error.message}</p>
            
            {errorDetails && (
              <details className="mt-2">
                <summary className="cursor-pointer text-sm">Show technical details</summary>
                <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">{errorDetails}</pre>
              </details>
            )}
            
            <SupabaseSetupChecker />
            
            <div className="mt-4">
              <Link href="/">
                <Button className="bg-[#2D9979] hover:bg-[#238b6d] text-white">
                  Go to Home Page
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {users.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-8">
                <h3 className="text-xl font-medium text-gray-700 mb-4">No users have subscribed yet</h3>
                <p className="text-gray-500 mb-6">When users subscribe using the form on the homepage, they will appear here.</p>
                <Link href="/">
                  <Button className="bg-[#2D9979] hover:bg-[#238b6d] text-white">
                    Go to Home Page
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(user.created_at).toLocaleDateString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Subjects Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Subjects</h2>
              
              {subjectsError ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                  <p className="font-medium">{subjectsError}</p>
                </div>
              ) : subjects.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <h3 className="text-xl font-medium text-gray-700 mb-4">No subjects available</h3>
                  <p className="text-gray-500">Subjects will appear here once they are added to the system.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="px-6 py-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {subject.code}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{subject.description}</p>
                      </div>
                      <div className="px-6 py-2 bg-gray-50 border-t border-gray-100">
                        <p className="text-xs text-gray-500">Added: {new Date(subject.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 