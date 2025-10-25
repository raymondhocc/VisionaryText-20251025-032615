import React, { useState, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Link, Loader2, Wand2, Bot, Copy, Check } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { IllustrativeIcon } from '@/components/IllustrativeIcon';
import { chatService } from '@/lib/chat';
import { cn } from '@/lib/utils';
export function HomePage() {
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      const file = acceptedFiles[0];
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast.error('File is too large. Please upload an image under 4MB.');
        return;
      }
      setImageFile(file);
      setImageUrl('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
      setOcrResult('');
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.webp'] },
    multiple: false,
  });
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    setImageFile(null);
    if (url) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
    setError(null);
    setOcrResult('');
  };
  const handlePerformOcr = async () => {
    if (!imageFile && !imageUrl) {
      toast.error('Please upload an image or provide a URL.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setOcrResult('');
    try {
      let base64Data: string | undefined = undefined;
      if (imageFile) {
        base64Data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.onerror = error => reject(error);
          reader.readAsDataURL(imageFile);
        });
      }
      const response = await chatService.performOcr(base64Data, imageUrl);
      if (response.success && response.data) {
        setOcrResult(response.data.text);
        toast.success('Text extracted successfully!');
      } else {
        throw new Error(response.error || 'Failed to extract text.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  const handleAskAi = async () => {
    if (!ocrResult) {
      toast.warning('No text to ask about. Perform OCR first.');
      return;
    }
    setIsAiLoading(true);
    setAiResponse('');
    try {
      const response = await chatService.askAi(ocrResult);
      if (response.success && response.data) {
        setAiResponse(response.data.response);
        toast.success('AI assistant responded!');
      } else {
        throw new Error(response.error || 'Failed to get AI response.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown AI error occurred.';
      toast.error(errorMessage);
    } finally {
      setIsAiLoading(false);
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(ocrResult);
    setHasCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setHasCopied(false), 2000);
  };
  const isInputAvailable = useMemo(() => !!(imageFile || imageUrl), [imageFile, imageUrl]);
  return (
    <>
      <Toaster richColors position="top-center" />
      <ThemeToggle className="fixed top-6 right-6" />
      <div className="min-h-screen w-full bg-background text-foreground font-sans antialiased">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 md:py-24 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground"
            >
              VisionaryText
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Effortless OCR from images or URLs, powered by AI and Cloudflare's edge network.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                    <UploadCloud className="w-7 h-7 text-brand-orange" />
                    Image Input
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div
                    {...getRootProps()}
                    className={cn(
                      'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-300',
                      isDragActive ? 'border-brand-orange bg-orange-500/10' : 'border-border hover:border-brand-orange'
                    )}
                  >
                    <input {...getInputProps()} />
                    <UploadCloud className="w-12 h-12 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">
                      {isDragActive ? 'Drop the image here...' : "Drag 'n' drop an image here, or click to select"}
                    </p>
                    <p className="text-xs text-muted-foreground/80 mt-1">PNG, JPG, WEBP up to 4MB</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="text-muted-foreground text-sm">OR</span>
                    <div className="flex-grow border-t border-border"></div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="imageUrl" className="font-medium text-sm">Paste image URL</label>
                    <div className="flex items-center gap-2">
                      <Link className="w-5 h-5 text-muted-foreground" />
                      <Input
                        id="imageUrl"
                        type="url"
                        placeholder="https://example.com/image.png"
                        value={imageUrl}
                        onChange={handleUrlChange}
                        className="bg-secondary"
                      />
                    </div>
                  </div>
                  <AnimatePresence>
                    {imagePreview && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4"
                      >
                        <p className="font-medium mb-2 text-sm">Image Preview:</p>
                        <div className="aspect-video rounded-lg overflow-hidden border border-border">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-contain bg-secondary" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <Button
                    onClick={handlePerformOcr}
                    disabled={!isInputAvailable || isLoading || isAiLoading}
                    className="w-full text-lg py-6 bg-brand-orange hover:bg-orange-600 text-white font-bold transition-all duration-300 transform hover:scale-105 active:scale-100"
                  >
                    {isLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin mr-2" />
                    ) : (
                      <IllustrativeIcon name="magic-wand" className="w-6 h-6 mr-2" />
                    )}
                    {isLoading ? 'Extracting Text...' : 'Perform OCR'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[500px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                    <IllustrativeIcon name="document" className="w-7 h-7 text-brand-blue" />
                    Extracted Text
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="relative">
                    <ScrollArea className="h-[320px] w-full rounded-md border bg-secondary p-4">
                      {isLoading ? (
                        <div className="space-y-3">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-[80%]" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-[90%]" />
                        </div>
                      ) : error ? (
                        <div className="text-center text-destructive flex flex-col items-center justify-center h-full">
                          <p className="font-semibold">Error</p>
                          <p className="text-sm">{error}</p>
                        </div>
                      ) : ocrResult ? (
                        <pre className="text-sm whitespace-pre-wrap font-sans">{ocrResult}</pre>
                      ) : (
                        <div className="text-center text-muted-foreground flex flex-col items-center justify-center h-full">
                          <p>Your extracted text will appear here.</p>
                        </div>
                      )}
                    </ScrollArea>
                    {ocrResult && !isLoading && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopy}
                        className="absolute top-2 right-2"
                      >
                        {hasCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    )}
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={handleAskAi}
                      disabled={!ocrResult || isLoading || isAiLoading}
                      className="w-full bg-brand-blue hover:bg-blue-600 text-white font-semibold transition-all duration-300"
                    >
                      {isAiLoading ? (
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      ) : (
                        <Bot className="w-5 h-5 mr-2" />
                      )}
                      {isAiLoading ? 'AI is thinking...' : 'Ask AI about this text'}
                    </Button>
                  </div>
                  <AnimatePresence>
                    {aiResponse && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-4"
                      >
                        <p className="font-medium text-sm mb-2">AI Assistant:</p>
                        <ScrollArea className="h-[120px] w-full rounded-md border bg-secondary p-4">
                          <pre className="text-sm whitespace-pre-wrap font-sans">{aiResponse}</pre>
                        </ScrollArea>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          <footer className="text-center py-16 text-muted-foreground/80 text-sm">
            <p>
              AI responses may be inaccurate or inappropriate. Please verify important information. There is a limit on the number of requests that can be made to the AI servers.
            </p>
            <p className="mt-2">Built with ❤️ at Cloudflare</p>
          </footer>
        </div>
      </div>
    </>
  );
}