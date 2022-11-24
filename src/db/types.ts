export interface FarmerOwnThing {
  type: "crop" | "harvest";
  count: number;
  name: string;
  cropId?: string;
}
