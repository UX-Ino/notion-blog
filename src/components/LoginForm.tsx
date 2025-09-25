import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Lock, User, LogIn } from "lucide-react";
import { useState } from "react";

interface LoginFormProps {
  onLogin: (success: boolean) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 간단한 데모용 로그인 (실제로는 백엔드 API 호출)
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'password') {
        onLogin(true);
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
        onLogin(false);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 border-2 border-slate-700 w-full max-w-md">
        <div className="p-8">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl text-slate-100 mb-2">관리자 로그인</h2>
            <p className="text-sm text-slate-400">
              관리 페이지에 접근하려면 로그인이 필요합니다
            </p>
          </div>

          {/* 로그인 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="아이디"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="pl-10 bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-400"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                type="password"
                placeholder="비밀번호"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="pl-10 bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-400"
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-900/20 border border-red-800 rounded p-3">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  로그인 중...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  로그인
                </div>
              )}
            </Button>
          </form>

          {/* 데모 안내 */}
          <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
            <p className="text-xs text-slate-400 text-center mb-2">
              💡 데모용 계정 정보
            </p>
            <div className="text-xs text-slate-300 space-y-1">
              <div>아이디: admin</div>
              <div>비밀번호: password</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}