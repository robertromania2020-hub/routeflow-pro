import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Download, LogOut, Trash2, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { lovable } from "@/integrations/lovable";

type Booking = {
  id: string; customer_name: string; phone: string;
  departure_city: string; destination_city: string;
  transport_type: string; message: string | null; language: string;
  status: string; created_at: string;
};

const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Auth form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s) checkAdmin(s.user.id);
      else { setIsAdmin(false); setLoading(false); }
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) checkAdmin(data.session.user.id);
      else setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const checkAdmin = async (uid: string) => {
    const { data } = await supabase.rpc("has_role", { _user_id: uid, _role: "admin" });
    setIsAdmin(!!data);
    if (data) loadBookings();
    else setLoading(false);
  };

  const loadBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setBookings((data as Booking[]) || []);
    setLoading(false);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email, password, options: { emailRedirectTo: window.location.origin + "/admin" },
      });
      if (error) return toast.error(error.message);
      toast.success("Cont creat. Cere unui admin să-ți acorde rol de admin.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return toast.error(error.message);
    }
  };

  const handleApple = async () => {
    const result = await lovable.auth.signInWithOAuth("apple", {
      redirect_uri: window.location.origin + "/admin",
    });
    if (result.error) toast.error((result.error as Error).message || "Apple sign-in failed");
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    setBookings((b) => b.map((x) => (x.id === id ? { ...x, status } : x)));
  };

  const remove = async (id: string) => {
    if (!confirm("Șterge această rezervare?")) return;
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setBookings((b) => b.filter((x) => x.id !== id));
  };

  const exportCSV = () => {
    const headers = ["Data", "Nume", "Telefon", "Plecare", "Destinatie", "Tip", "Status", "Limba", "Mesaj"];
    const rows = filtered.map((b) => [
      new Date(b.created_at).toLocaleString(),
      b.customer_name, b.phone, b.departure_city, b.destination_city,
      b.transport_type, b.status, b.language, (b.message || "").replace(/[\r\n]+/g, " "),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `bgd-trans-rezervari-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = bookings.filter((b) =>
    (filterType === "all" || b.transport_type === filterType) &&
    (filterStatus === "all" || b.status === filterStatus)
  );

  if (loading) return <div className="p-10 text-center text-muted-foreground">Se încarcă...</div>;

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/40 p-4">
        <form onSubmit={handleAuth} className="bg-card p-8 rounded-2xl shadow-elegant w-full max-w-md space-y-4 border border-border">
          <Link to="/" className="text-sm text-muted-foreground">← Acasă</Link>
          <h1 className="text-2xl font-bold">Panou Admin BGD-Trans</h1>
          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label>Parolă</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          <Button type="submit" className="w-full bg-primary">{mode === "login" ? "Autentificare" : "Creează cont"}</Button>
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">sau</span></div>
          </div>
          <Button type="button" onClick={handleApple} className="w-full bg-black text-white hover:bg-black/90">
            <svg className="h-4 w-4 mr-2" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
            Sign in with Apple
          </Button>
          <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-xs text-muted-foreground hover:text-accent block w-full">
            {mode === "login" ? "Nu ai cont? Înregistrează-te" : "Ai deja cont? Loghează-te"}
          </button>
        </form>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 text-center">
        <div className="bg-card p-8 rounded-2xl border border-border max-w-md">
          <h1 className="text-xl font-bold mb-2">Acces refuzat</h1>
          <p className="text-muted-foreground text-sm mb-4">Contul tău ({session.user.email}) nu are rol de admin. Roagă un administrator să-ți acorde acces în baza de date (tabel <code>user_roles</code>).</p>
          <Button variant="outline" onClick={() => supabase.auth.signOut()}><LogOut className="h-4 w-4 mr-2" /> Logout</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container flex items-center justify-between">
          <Link to="/" className="font-bold text-lg">BGD-Trans · Admin</Link>
          <div className="flex items-center gap-2">
            <span className="text-xs hidden md:inline">{session.user.email}</span>
            <Button size="sm" variant="secondary" onClick={() => supabase.auth.signOut()}><LogOut className="h-4 w-4 mr-1" /> Logout</Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex flex-wrap gap-4 items-end mb-6">
          <div>
            <Label className="text-xs">Tip</Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate</SelectItem>
                <SelectItem value="persons">Persoane</SelectItem>
                <SelectItem value="parcels">Colete</SelectItem>
                <SelectItem value="auto">Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Status</Label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate</SelectItem>
                <SelectItem value="new">Nou</SelectItem>
                <SelectItem value="confirmed">Confirmat</SelectItem>
                <SelectItem value="done">Finalizat</SelectItem>
                <SelectItem value="cancelled">Anulat</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={exportCSV} className="bg-accent text-accent-foreground"><Download className="h-4 w-4 mr-1" /> Export CSV</Button>
          <span className="ml-auto text-sm text-muted-foreground">{filtered.length} rezervări</span>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left">
              <tr>
                <th className="p-3">Data</th>
                <th className="p-3">Client</th>
                <th className="p-3">Rută</th>
                <th className="p-3">Tip</th>
                <th className="p-3">Status</th>
                <th className="p-3">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-t border-border hover:bg-secondary/40">
                  <td className="p-3 text-xs whitespace-nowrap">{new Date(b.created_at).toLocaleString()}</td>
                  <td className="p-3">
                    <div className="font-semibold">{b.customer_name}</div>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <a href={`tel:${b.phone}`} className="hover:text-accent inline-flex items-center gap-1"><Phone className="h-3 w-3" />{b.phone}</a>
                      <a href={`https://wa.me/${b.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener" className="hover:text-accent inline-flex items-center gap-1"><MessageCircle className="h-3 w-3" />WA</a>
                    </div>
                    {b.message && <div className="text-xs text-muted-foreground mt-1 italic">"{b.message}"</div>}
                  </td>
                  <td className="p-3 text-xs">{b.departure_city} → {b.destination_city}</td>
                  <td className="p-3 text-xs capitalize">{b.transport_type}</td>
                  <td className="p-3">
                    <Select value={b.status} onValueChange={(v) => updateStatus(b.id, v)}>
                      <SelectTrigger className="h-8 w-32 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Nou</SelectItem>
                        <SelectItem value="confirmed">Confirmat</SelectItem>
                        <SelectItem value="done">Finalizat</SelectItem>
                        <SelectItem value="cancelled">Anulat</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-3">
                    <Button size="sm" variant="ghost" onClick={() => remove(b.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Nicio rezervare</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          💡 Pentru a acorda rol de admin unui utilizator, adaugă o intrare în tabelul <code>user_roles</code> cu <code>role = 'admin'</code> din panoul backend.
        </p>
      </main>
    </div>
  );
};

export default Admin;