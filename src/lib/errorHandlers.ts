import { auth } from "./firebase";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  let authInfo = {
    userId: null as string | null,
    email: null as string | null,
    emailVerified: false as boolean,
    isAnonymous: false as boolean,
    tenantId: null as string | null,
    providerInfo: [] as any[]
  };

  try {
    if (auth?.currentUser) {
      authInfo = {
        userId: auth.currentUser.uid,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        isAnonymous: auth.currentUser.isAnonymous,
        tenantId: auth.currentUser.tenantId,
        providerInfo: auth.currentUser.providerData?.map(provider => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || []
      };
    }
  } catch (e) {
    console.warn("Could not retrieve auth state for error report", e);
  }

  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo,
    operationType,
    path
  }
  console.error('[FIRESTORE ERROR]', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
