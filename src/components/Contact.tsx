import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { submitContactForm, ContactFormData } from '@/services/contactService';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });
  
  const handleSubmit = async (formData: FormValues) => {
    setIsSubmitting(true);
    
    try {
      await submitContactForm(formData as ContactFormData);
      
      toast.success('Message sent successfully! I will get back to you soon.');
      
      form.reset();
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      const errorMessage = error?.message || 'Failed to send message. Please try again later.';
      
      if (errorMessage.includes('Supabase configuration is missing')) {
        toast.error('Backend configuration issue. Please contact the site administrator.');
      } else if (errorMessage.includes('network') || errorMessage.includes('connection')) {
        toast.error('Network issue. Please check your internet connection and try again.');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="relative" ref={ref}>
      <div className="absolute -top-20 left-10 w-72 h-72 bg-portfolio-teal rounded-full filter blur-[120px] opacity-10"></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className={`section-heading ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            Get In Touch
          </h2>
          <p className={`section-subheading mx-auto ${isVisible ? 'animate-fade-in delay-100' : 'opacity-0'}`}>
            Interested in working together? Feel free to reach out!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
          <div className={`lg:col-span-2 ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="card h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-portfolio-light">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-portfolio-teal/10 p-3 rounded-full">
                      <Mail className="text-portfolio-teal" size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm text-portfolio-gray mb-1">Email</h4>
                      <a href="mailto:sanketdebnath73@gmail.com" className="hover:text-portfolio-teal transition-colors">
                        sanketdebnath73@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-portfolio-teal/10 p-3 rounded-full">
                      <Phone className="text-portfolio-teal" size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm text-portfolio-gray mb-1">Phone</h4>
                      <a href="tel:+918101862947" className="hover:text-portfolio-teal transition-colors">
                        +91 8101862947
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-portfolio-teal/10 p-3 rounded-full">
                      <MapPin className="text-portfolio-teal" size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm text-portfolio-gray mb-1">Location</h4>
                      <p>Barasat, Kolkata, West Bengal, India</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="text-sm text-portfolio-gray mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://www.linkedin.com/in/sanket-debnath-286b05292" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-portfolio-dark/60 hover:bg-portfolio-teal/20 p-3 rounded-full transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a 
                    href="https://github.com/Sanket-cp" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-portfolio-dark/60 hover:bg-portfolio-teal/20 p-3 rounded-full transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`lg:col-span-3 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="card">
              <h3 className="text-2xl font-bold mb-6 text-portfolio-light">Send Me a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-portfolio-gray">Your Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-portfolio-dark/30 border-portfolio-gray/20 focus-visible:ring-portfolio-teal"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-portfolio-gray">Your Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              className="bg-portfolio-dark/30 border-portfolio-gray/20 focus-visible:ring-portfolio-teal"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-portfolio-gray">Subject</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-portfolio-dark/30 border-portfolio-gray/20 focus-visible:ring-portfolio-teal"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-portfolio-gray">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={5}
                            className="bg-portfolio-dark/30 border-portfolio-gray/20 focus-visible:ring-portfolio-teal"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit"
                    className="bg-portfolio-teal hover:bg-portfolio-teal/90 text-white w-full sm:w-auto flex gap-2 items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
