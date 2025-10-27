import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mic, Send, Heart, Users, MessageCircle, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  culturalContext?: string;
  timestamp: Date;
}

interface CulturalConversationInterfaceProps {
  culturalStyle?: 'collectivist' | 'individualist' | 'high-context' | 'direct';
  className?: string;
}

export function CulturalConversationInterface({
  culturalStyle = 'individualist',
  className
}: CulturalConversationInterfaceProps) {
  const { i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm here to support you in a way that honors your cultural background and communication style. How are you feeling today?",
      sender: 'ai',
      culturalContext: 'greeting-adaptive',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getCulturalBubbleStyle = (sender: 'user' | 'ai') => {
    const baseStyles = "max-w-[80%] p-4 rounded-2xl mb-4 transition-all duration-300";
    
    switch (culturalStyle) {
      case 'collectivist':
        return cn(baseStyles, 
          sender === 'user' 
            ? "bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 ml-auto mr-4 shadow-gentle" 
            : "bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 mr-auto ml-4 shadow-gentle"
        );
      case 'high-context':
        return cn(baseStyles, 
          sender === 'user' 
            ? "bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 ml-auto mr-8 shadow-elegant rounded-3xl" 
            : "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 mr-auto ml-8 shadow-elegant rounded-3xl"
        );
      case 'direct':
        return cn(baseStyles, 
          sender === 'user' 
            ? "bg-white border-2 border-primary ml-auto rounded-lg shadow-sm" 
            : "bg-muted border border-border mr-auto rounded-lg shadow-sm"
        );
      default: // individualist
        return cn(baseStyles, 
          sender === 'user' 
            ? "bg-primary text-primary-foreground ml-auto shadow-gentle" 
            : "bg-card border border-border mr-auto shadow-gentle"
        );
    }
  };

  const getCulturalInputStyle = () => {
    switch (culturalStyle) {
      case 'collectivist':
        return "border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 focus:border-amber-400 rounded-2xl";
      case 'high-context':
        return "border-2 border-slate-200 bg-gradient-to-r from-slate-50 to-gray-50 focus:border-slate-400 rounded-3xl";
      case 'direct':
        return "border-2 border-primary bg-white focus:border-primary rounded-lg";
      default:
        return "border-2 border-border bg-background focus:border-primary rounded-2xl";
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Convert messages to the format expected by the API
      const conversationHistory = messages
        .filter(msg => msg.sender === 'user' || msg.sender === 'ai')
        .map(msg => ({
          role: msg.sender === 'ai' ? 'assistant' : msg.sender, // API expects 'assistant' not 'ai'
          content: msg.content,
          timestamp: msg.timestamp.toISOString()
        }));

      // Get the API base URL from environment variables
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

      // Get current language preference
      const userLanguage = i18n.language || 'en';
      const languageNames: { [key: string]: string } = {
        en: 'English',
        es: 'Spanish',
        zh: 'Chinese',
        ar: 'Arabic',
        hi: 'Hindi',
        fr: 'French',
        pt: 'Portuguese',
        ru: 'Russian',
        ja: 'Japanese',
        ko: 'Korean'
      };

      // Call the test endpoint (no authentication required)
      // Note: Change to '/v1/chat/message' once authentication is implemented
      const response = await fetch(`${apiBaseUrl}/v1/chat/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          conversation_history: conversationHistory,
          include_mood_context: false, // Test endpoint doesn't support mood context
          user_language: userLanguage,
          language_instruction: userLanguage !== 'en' ? `Please respond in ${languageNames[userLanguage] || userLanguage}` : undefined
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      setIsTyping(false);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        sender: 'ai',
        culturalContext: 'empathetic-response',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      // Fallback response if API call fails
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm currently unable to connect to the AI service. Please try again in a moment. If you need immediate support, consider reaching out to a mental health professional or crisis hotline.",
        sender: 'ai',
        culturalContext: 'fallback-response',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackResponse]);
    }
  };

  const getCulturalContextBadge = (context?: string) => {
    if (!context) return null;
    
    const contextColors = {
      'greeting-adaptive': 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800',
      'empathetic-response': 'bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800',
      'cultural-understanding': 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800'
    };
    
    return (
      <Badge className={cn("text-xs mb-2", contextColors[context as keyof typeof contextColors])}>
        {context.replace('-', ' ')}
      </Badge>
    );
  };

  return (
    <Card className={cn("h-[600px] flex flex-col bg-gradient-to-br from-background to-muted/30", className)}>
      {/* Header */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Cultural Companion</h3>
              <p className="text-sm text-muted-foreground">
                {culturalStyle === 'collectivist' && "Community-centered conversation"}
                {culturalStyle === 'individualist' && "Personal wellness focus"}
                {culturalStyle === 'high-context' && "Contextual understanding"}
                {culturalStyle === 'direct' && "Clear, direct communication"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              <Languages className="w-3 h-3 mr-1" />
              {culturalStyle}
            </Badge>
          </div>
        </div>
      </div>

      {/* Messages Area with Animations */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: "easeOut"
              }}
              className="w-full"
            >
              {message.sender === 'ai' && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                >
                  {getCulturalContextBadge(message.culturalContext)}
                </motion.div>
              )}
              <motion.div
                className={getCulturalBubbleStyle(message.sender)}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className="text-xs opacity-60 mt-2 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 ml-4"
            >
              <div className="flex gap-1">
                <motion.div
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
              <span className="text-xs text-muted-foreground">AI is thinking...</span>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Cultural Input Area */}
      <div className="p-4 border-t border-border bg-gradient-to-r from-background to-muted/20">
        {/* Cultural Expression Options */}
        <div className="flex gap-2 mb-3 overflow-x-auto">
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="sm" className="text-xs whitespace-nowrap">
              <Users className="w-3 h-3 mr-1" />
              Family Context
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="sm" className="text-xs whitespace-nowrap">
              <Heart className="w-3 h-3 mr-1" />
              Emotional Metaphor
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="sm" className="text-xs whitespace-nowrap">
              <MessageCircle className="w-3 h-3 mr-1" />
              Cultural Expression
            </Button>
          </motion.div>
        </div>
        
        {/* Input Area */}
        <div className="flex gap-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              culturalStyle === 'collectivist' 
                ? "Share how you and your family are feeling..."
                : culturalStyle === 'high-context'
                ? "Express what's in your heart..."
                : culturalStyle === 'direct'
                ? "What's your specific concern?"
                : "How are you feeling today?"
            }
            className={cn("resize-none min-h-[60px]", getCulturalInputStyle())}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <div className="flex flex-col gap-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant={isVoiceMode ? "default" : "outline"}
                size="icon"
                onClick={() => setIsVoiceMode(!isVoiceMode)}
                className="transition-all duration-200"
              >
                <motion.div
                  animate={isVoiceMode ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isVoiceMode ? Infinity : 0 }}
                >
                  <Mic className={cn("w-4 h-4", isVoiceMode && "text-red-500")} />
                </motion.div>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={sendMessage}
                size="icon"
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Cultural Comfort Indicator */}
        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <span>Cultural adaptation: Active</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Culturally comfortable</span>
          </div>
        </div>
      </div>
    </Card>
  );
}