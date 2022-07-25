export type AsyncType = 'idle' | 'pending' | 'succeeded' | 'failed';

export interface IAsync {
  loading: AsyncType;
  error: string | null;
}
