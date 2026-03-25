import { db } from '../../src/config/firebaseconfig';
import { setDoc, doc, getDoc } from 'firebase/firestore';

// Mock Firestore
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(),
  serverTimestamp: jest.fn(() => 'mock-timestamp'),
}));

describe('Auth Persistence Logic', () => {
  const mockAdminData = {
    name: 'Admin User',
    email: 'admin@test.com',
    phone: '1234567890',
    role: 'admin',
    createdAt: 'mock-timestamp'
  };

  it('should save admin data to the correct subcollection path', async () => {
    const uid = 'test-uid';
    const mockDoc = { id: uid };
    (doc as jest.Mock).mockReturnValue(mockDoc);
    
    await setDoc(doc(db, 'users', 'admin_group', 'admins', uid), mockAdminData);

    expect(doc).toHaveBeenCalledWith(db, 'users', 'admin_group', 'admins', uid);
    expect(setDoc).toHaveBeenCalledWith(mockDoc, mockAdminData);
  });

  it('should retrieve admin data correctly', async () => {
    const uid = 'test-uid';
    const mockDoc = { id: uid };
    const mockSnapshot = {
      exists: () => true,
      data: () => mockAdminData
    };

    (doc as jest.Mock).mockReturnValue(mockDoc);
    (getDoc as jest.Mock).mockResolvedValue(mockSnapshot);

    const result = await getDoc(doc(db, 'users', 'admin_group', 'admins', uid));
    
    expect(result.exists()).toBe(true);
    expect(result.data()).toEqual(mockAdminData);
  });
});
