import { auth, db } from '../../src/config/firebaseconfig';

describe('Firebase Integration', () => {
  it('should have initialized Firebase Auth', () => {
    expect(auth).toBeDefined();
  });

  it('should have initialized Firestore DB', () => {
    expect(db).toBeDefined();
  });

  it('should have access to environment variables (via config)', () => {
    expect(auth.app.options.apiKey).toBeDefined();
    expect(auth.app.options.projectId).toBeDefined();
  });
});
