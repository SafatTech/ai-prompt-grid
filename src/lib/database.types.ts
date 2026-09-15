export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type StyleStatus = "draft" | "published";
export type ImageRole = "before" | "after" | "gallery";
export type UserRole = "user" | "admin";
export type WaitlistInterest = "video" | "generator";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      styles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          short_description: string | null;
          prompt: string;
          how_to_use: string | null;
          category_id: string;
          status: StyleStatus;
          is_featured: boolean;
          model_slugs: string[];
          seo_title: string | null;
          seo_description: string | null;
          copy_count: number;
          published_at: string | null;
          created_at: string;
          updated_at: string;
          created_by: string | null;
          is_premium: boolean;
          credit_cost: number | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          short_description?: string | null;
          prompt?: string;
          how_to_use?: string | null;
          category_id: string;
          status?: StyleStatus;
          is_featured?: boolean;
          model_slugs?: string[];
          seo_title?: string | null;
          seo_description?: string | null;
          copy_count?: number;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
          is_premium?: boolean;
          credit_cost?: number | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          short_description?: string | null;
          prompt?: string;
          how_to_use?: string | null;
          category_id?: string;
          status?: StyleStatus;
          is_featured?: boolean;
          model_slugs?: string[];
          seo_title?: string | null;
          seo_description?: string | null;
          copy_count?: number;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
          is_premium?: boolean;
          credit_cost?: number | null;
        };
          Relationships: [
            {
              foreignKeyName: "styles_category_id_fkey";
              columns: ["category_id"];
              isOneToOne: false;
              referencedRelation: "categories";
              referencedColumns: ["id"];
            },
          ];
        };
      style_images: {
        Row: {
          id: string;
          style_id: string;
          storage_path: string;
          public_url: string;
          role: ImageRole;
          alt_text: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          style_id: string;
          storage_path: string;
          public_url: string;
          role: ImageRole;
          alt_text?: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          style_id?: string;
          storage_path?: string;
          public_url?: string;
          role?: ImageRole;
          alt_text?: string;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "style_images_style_id_fkey";
            columns: ["style_id"];
            isOneToOne: false;
            referencedRelation: "styles";
            referencedColumns: ["id"];
          },
        ];
      };
      favorites: {
        Row: {
          user_id: string;
          style_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          style_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          style_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      waitlist_entries: {
        Row: {
          id: string;
          email: string;
          interest: WaitlistInterest;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          interest: WaitlistInterest;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          interest?: WaitlistInterest;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
      increment_style_copy_count: {
        Args: { style_id: string };
        Returns: undefined;
      };
    };
    Enums: {
      style_status: StyleStatus;
      image_role: ImageRole;
      user_role: UserRole;
      waitlist_interest: WaitlistInterest;
    };
    CompositeTypes: Record<string, never>;
  };
};

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Style = Database["public"]["Tables"]["styles"]["Row"];
export type StyleImage = Database["public"]["Tables"]["style_images"]["Row"];
