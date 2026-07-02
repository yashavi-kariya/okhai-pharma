import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AVAILABLE_PRODUCTS = [
    'Nicotine Sulphate 40%',
    'Nicotine Alkaloid 90% / 95%',
];

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inquiries, setInquiries] = useState([]);
    const [filter, setFilter] = useState('all');
    const [productFilter, setProductFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('okhai_admin_token');
        if (!token) {
            navigate('/admin/log-in', { replace: true });
            return;
        }

        async function loadAdmin() {
            try {
                const response = await fetch('/api/admin/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error('Unauthorized');
                }

                const data = await response.json();
                setAdmin(data.admin);
            } catch (error) {
                localStorage.removeItem('okhai_admin_token');
                navigate('/admin/log-in', { replace: true });
            } finally {
                setLoading(false);
            }
        }

        loadAdmin();
    }, [navigate]);

    useEffect(() => {
        async function loadInquiries() {
            try {
                const params = new URLSearchParams();
                if (filter && filter !== 'all') params.set('sourcePage', filter);
                if (productFilter && productFilter !== 'all') params.set('productName', productFilter);
                if (searchQuery) params.set('q', searchQuery);

                const query = params.toString() ? `?${params.toString()}` : '';
                const response = await fetch(`/api/admin/inquiries${query}`);
                const data = await response.json();
                setInquiries(data.inquiries || []);
            } catch (error) {
                console.error(error);
            }
        }

        loadInquiries();
    }, [filter, productFilter, searchQuery]);

    async function handleLogout() {
        localStorage.removeItem('okhai_admin_token');
        await fetch('/api/admin/logout', { method: 'POST' });
        navigate('/admin/log-in', { replace: true });
    }

    if (loading) {
        return <div style={{ padding: '40px', fontSize: '18px' }}>Loading admin dashboard...</div>;
    }

    function formatDate(d) {
        try {
            return new Date(d).toLocaleString();
        } catch (e) {
            return d;
        }
    }

    async function refresh() {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filter && filter !== 'all') params.set('sourcePage', filter);
            if (productFilter && productFilter !== 'all') params.set('productName', productFilter);
            if (searchQuery) params.set('q', searchQuery);
            const query = params.toString() ? `?${params.toString()}` : '';
            const response = await fetch(`/api/admin/inquiries${query}`);
            const data = await response.json();
            setInquiries(data.inquiries || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        if (!id) return;
        if (!confirm('Delete this inquiry? This action cannot be undone.')) return;
        try {
            const resp = await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' });
            if (!resp.ok) throw new Error('Delete failed');
            setInquiries((prev) => prev.filter((i) => i._id !== id));
        } catch (err) {
            console.error(err);
            alert('Unable to delete inquiry');
        }
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>
            {/* Sidebar */}
            <aside style={{ width: '260px', background: '#fff', borderRight: '1px solid #e6edf3', padding: '28px 20px', boxSizing: 'border-box' }}>
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{ margin: 0, color: '#0b1220' }}>Admin Panel</h2>
                    <p style={{ margin: '6px 0 0', color: '#6b7280' }}>Signed in: <strong>{admin?.name || 'admin'}</strong></p>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button style={{ textAlign: 'left', padding: '10px 12px', borderRadius: '8px', background: '#eef2ff', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Inquiries</button>
                    <button style={{ textAlign: 'left', padding: '10px 12px', borderRadius: '8px', background: 'transparent', border: 'none', cursor: 'pointer' }}>Careers</button>
                </nav>

                <div style={{ marginTop: 'auto' }}>
                    <button onClick={handleLogout} style={{ width: '100%', marginTop: '32px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px', cursor: 'pointer' }}>Logout</button>
                </div>
            </aside>

            {/* Main content */}
            <main style={{ flex: 1, padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '16px', marginBottom: '18px' }}>
                    <div>
                        <h1 style={{ margin: 0, color: '#0f172a', fontSize: '28px' }}>Inquiry Management Dashboard</h1>
                        <p style={{ margin: '8px 0 0', color: '#64748b' }}>Manage inquiries from contact and product pages.</p>
                    </div>
                    <div>
                        <button onClick={refresh} style={{ background: '#fff', border: '1px solid #e6edf3', padding: '10px 14px', borderRadius: '10px', cursor: 'pointer' }}>Refresh</button>
                    </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
                    <div style={{ background: '#fff', border: '1px solid #e6edf3', borderRadius: '12px', padding: '18px' }}>
                        <div style={{ fontSize: '12px', color: '#718096', textTransform: 'uppercase', fontWeight: 700 }}>Total inquiries</div>
                        <div style={{ fontSize: '22px', color: '#0f172a', marginTop: '8px' }}>{inquiries.length}</div>
                    </div>
                    <div style={{ background: '#fff', border: '1px solid #e6edf3', borderRadius: '12px', padding: '18px' }}>
                        <div style={{ fontSize: '12px', color: '#718096', textTransform: 'uppercase', fontWeight: 700 }}>Contact page</div>
                        <div style={{ fontSize: '22px', color: '#0f172a', marginTop: '8px' }}>{inquiries.filter((i) => i.sourcePage === 'contact').length}</div>
                    </div>
                    <div style={{ background: '#fff', border: '1px solid #e6edf3', borderRadius: '12px', padding: '18px' }}>
                        <div style={{ fontSize: '12px', color: '#718096', textTransform: 'uppercase', fontWeight: 700 }}>Product page</div>
                        <div style={{ fontSize: '22px', color: '#0f172a', marginTop: '8px' }}>{inquiries.filter((i) => i.sourcePage === 'product').length}</div>
                    </div>
                    <div style={{ background: '#fff', border: '1px solid #e6edf3', borderRadius: '12px', padding: '18px' }}>
                        <div style={{ fontSize: '12px', color: '#718096', textTransform: 'uppercase', fontWeight: 700 }}>Top source</div>
                        <div style={{ fontSize: '16px', color: '#0f172a', marginTop: '8px' }}>{inquiries.length ? (inquiries.filter(i => i.sourcePage === 'product').length > inquiries.filter(i => i.sourcePage === 'contact').length ? 'Product' : 'Contact') : '-'}</div>
                    </div>
                </div>

                {/* Filters card */}
                <div style={{ background: '#fff', border: '1px solid #e6edf3', borderRadius: '12px', padding: '16px', marginBottom: '18px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div>
                            <select value={filter} onChange={(e) => { setFilter(e.target.value); setProductFilter('all'); }} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e6edf3', minWidth: '160px' }}>
                                <option value="all">All</option>
                                <option value="contact">Contact page</option>
                                <option value="product">Product page</option>
                            </select>
                        </div>
                        <div>
                            <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e6edf3', minWidth: '200px' }}>
                                <option value="all">All products</option>
                                {AVAILABLE_PRODUCTS.map(p => (<option key={p} value={p}>{p}</option>))}
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search name, email, subject or company" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e6edf3' }} />
                        </div>
                        <div>
                            <button onClick={refresh} style={{ background: '#f97316', color: '#fff', padding: '10px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Search</button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div style={{ background: '#fff', border: '1px solid #e6edf3', borderRadius: '12px', padding: '0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#f8fafc' }}>
                            <tr>
                                <th style={thStyle}>Date</th>
                                <th style={thStyle}>Company</th>
                                <th style={thStyle}>Name</th>
                                <th style={thStyle}>Contact</th>
                                <th style={thStyle}>Source</th>
                                <th style={thStyle}>Product</th>
                                <th style={thStyle}>Subject</th>
                                <th style={thStyle}>Message</th>
                                <th style={thStyle}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ padding: '36px', textAlign: 'center', color: '#64748b' }}>No inquiries found.</td>
                                </tr>
                            ) : inquiries.map(item => (
                                <tr key={item._id} style={{ borderTop: '1px solid #eef2f7' }}>
                                    <td style={tdStyle}>{formatDate(item.createdAt)}</td>
                                    <td style={tdStyle}>{item.company || '-'}</td>
                                    <td style={tdStyle}>{item.name}</td>
                                    <td style={tdStyle}>{item.phone || item.email}</td>
                                    <td style={tdStyle}>{item.sourcePage === 'product' ? 'Product page' : 'Contact page'}</td>
                                    <td style={tdStyle}>{item.productName || (item.sourcePage === 'product' ? 'Product inquiry' : '-')}</td>
                                    <td style={tdStyle}>{item.subject || '-'}</td>
                                    <td style={tdStyle}>{item.message?.slice(0, 120)}</td>
                                    <td style={tdStyle}><button onClick={() => handleDelete(item._id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer' }}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

const thStyle = { textAlign: 'left', padding: '12px 16px', color: '#475569', fontSize: '13px' };
const tdStyle = { padding: '12px 16px', color: '#0f172a', verticalAlign: 'top', fontSize: '14px' };
