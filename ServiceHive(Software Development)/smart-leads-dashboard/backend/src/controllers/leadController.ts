import { Response } from 'express';
import Lead from '../models/Lead';
import { AuthRequest } from '../middleware/auth';

export const getLeads = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, source, search, sort, page = 1, limit = 10 } = req.query;

    const query: any = {};

    if (status)  query.status = status;
    if (source)  query.source = source;
    if (search)  query.$or = [
      { name:  { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];

    const sortOrder = sort === 'oldest' ? 1 : -1;
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Lead.countDocuments(query);

    const leads = await Lead.find(query)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(Number(limit))
      .populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      data: leads,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id).populate('createdBy', 'name email');
    if (!lead) { res.status(404).json({ success: false, message: 'Lead not found' }); return; }
    res.status(200).json({ success: true, data: lead });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.create({ ...req.body, createdBy: req.user?.id });
    res.status(201).json({ success: true, data: lead });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!lead) { res.status(404).json({ success: false, message: 'Lead not found' }); return; }
    res.status(200).json({ success: true, data: lead });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) { res.status(404).json({ success: false, message: 'Lead not found' }); return; }
    res.status(200).json({ success: true, message: 'Lead deleted' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const exportCSV = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const leads = await Lead.find().populate('createdBy', 'name');
    const header = 'Name,Email,Status,Source,Created At\n';
    const rows = leads.map(l =>
      `${l.name},${l.email},${l.status},${l.source},${l.createdAt}`
    ).join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.status(200).send(header + rows);
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};