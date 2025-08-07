// Branded types for type safety
type Branded<T, U extends string> = T & { [key in U]: never };

export type UserId = Branded<string, 'UserId'>;
