/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/Bill": {
    get: {
      parameters: {
        query: {
          deadline?: parameters["rowFilter.Bill.deadline"];
          payee?: parameters["rowFilter.Bill.payee"];
          amount?: parameters["rowFilter.Bill.amount"];
          category?: parameters["rowFilter.Bill.category"];
          id?: parameters["rowFilter.Bill.id"];
          userId?: parameters["rowFilter.Bill.userId"];
          completedDate?: parameters["rowFilter.Bill.completedDate"];
          archivedDate?: parameters["rowFilter.Bill.archivedDate"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["Bill"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** Bill */
          Bill?: definitions["Bill"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          deadline?: parameters["rowFilter.Bill.deadline"];
          payee?: parameters["rowFilter.Bill.payee"];
          amount?: parameters["rowFilter.Bill.amount"];
          category?: parameters["rowFilter.Bill.category"];
          id?: parameters["rowFilter.Bill.id"];
          userId?: parameters["rowFilter.Bill.userId"];
          completedDate?: parameters["rowFilter.Bill.completedDate"];
          archivedDate?: parameters["rowFilter.Bill.archivedDate"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          deadline?: parameters["rowFilter.Bill.deadline"];
          payee?: parameters["rowFilter.Bill.payee"];
          amount?: parameters["rowFilter.Bill.amount"];
          category?: parameters["rowFilter.Bill.category"];
          id?: parameters["rowFilter.Bill.id"];
          userId?: parameters["rowFilter.Bill.userId"];
          completedDate?: parameters["rowFilter.Bill.completedDate"];
          archivedDate?: parameters["rowFilter.Bill.archivedDate"];
        };
        body: {
          /** Bill */
          Bill?: definitions["Bill"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/FixedReminder": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.FixedReminder.id"];
          created_at?: parameters["rowFilter.FixedReminder.created_at"];
          computedDate?: parameters["rowFilter.FixedReminder.computedDate"];
          billID?: parameters["rowFilter.FixedReminder.billID"];
          relativeTime?: parameters["rowFilter.FixedReminder.relativeTime"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["FixedReminder"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** FixedReminder */
          FixedReminder?: definitions["FixedReminder"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.FixedReminder.id"];
          created_at?: parameters["rowFilter.FixedReminder.created_at"];
          computedDate?: parameters["rowFilter.FixedReminder.computedDate"];
          billID?: parameters["rowFilter.FixedReminder.billID"];
          relativeTime?: parameters["rowFilter.FixedReminder.relativeTime"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.FixedReminder.id"];
          created_at?: parameters["rowFilter.FixedReminder.created_at"];
          computedDate?: parameters["rowFilter.FixedReminder.computedDate"];
          billID?: parameters["rowFilter.FixedReminder.billID"];
          relativeTime?: parameters["rowFilter.FixedReminder.relativeTime"];
        };
        body: {
          /** FixedReminder */
          FixedReminder?: definitions["FixedReminder"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/RecurringReminder": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.RecurringReminder.id"];
          created_at?: parameters["rowFilter.RecurringReminder.created_at"];
          intervalUnit?: parameters["rowFilter.RecurringReminder.intervalUnit"];
          specificUnit?: parameters["rowFilter.RecurringReminder.specificUnit"];
          billID?: parameters["rowFilter.RecurringReminder.billID"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["RecurringReminder"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** RecurringReminder */
          RecurringReminder?: definitions["RecurringReminder"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.RecurringReminder.id"];
          created_at?: parameters["rowFilter.RecurringReminder.created_at"];
          intervalUnit?: parameters["rowFilter.RecurringReminder.intervalUnit"];
          specificUnit?: parameters["rowFilter.RecurringReminder.specificUnit"];
          billID?: parameters["rowFilter.RecurringReminder.billID"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.RecurringReminder.id"];
          created_at?: parameters["rowFilter.RecurringReminder.created_at"];
          intervalUnit?: parameters["rowFilter.RecurringReminder.intervalUnit"];
          specificUnit?: parameters["rowFilter.RecurringReminder.specificUnit"];
          billID?: parameters["rowFilter.RecurringReminder.billID"];
        };
        body: {
          /** RecurringReminder */
          RecurringReminder?: definitions["RecurringReminder"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  Bill: {
    /** Format: date */
    deadline?: string;
    /** Format: text */
    payee?: string;
    /** Format: double precision */
    amount?: number;
    /** Format: text */
    category?: string;
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /** Format: uuid */
    userId?: string;
    /** Format: date */
    completedDate?: string;
    /** Format: date */
    archivedDate?: string;
  };
  FixedReminder: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: timestamp without time zone */
    computedDate: string;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `Bill.id`.<fk table='Bill' column='id'/>
     */
    billID: number;
    /** Format: json */
    relativeTime?: string;
  };
  RecurringReminder: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: text */
    intervalUnit: string;
    /** Format: ARRAY */
    specificUnit?: unknown[];
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `Bill.id`.<fk table='Bill' column='id'/>
     */
    billID?: number;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description Bill */
  "body.Bill": definitions["Bill"];
  /** Format: date */
  "rowFilter.Bill.deadline": string;
  /** Format: text */
  "rowFilter.Bill.payee": string;
  /** Format: double precision */
  "rowFilter.Bill.amount": string;
  /** Format: text */
  "rowFilter.Bill.category": string;
  /** Format: bigint */
  "rowFilter.Bill.id": string;
  /** Format: uuid */
  "rowFilter.Bill.userId": string;
  /** Format: date */
  "rowFilter.Bill.completedDate": string;
  /** Format: date */
  "rowFilter.Bill.archivedDate": string;
  /** @description FixedReminder */
  "body.FixedReminder": definitions["FixedReminder"];
  /** Format: bigint */
  "rowFilter.FixedReminder.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.FixedReminder.created_at": string;
  /** Format: timestamp without time zone */
  "rowFilter.FixedReminder.computedDate": string;
  /** Format: bigint */
  "rowFilter.FixedReminder.billID": string;
  /** Format: json */
  "rowFilter.FixedReminder.relativeTime": string;
  /** @description RecurringReminder */
  "body.RecurringReminder": definitions["RecurringReminder"];
  /** Format: bigint */
  "rowFilter.RecurringReminder.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.RecurringReminder.created_at": string;
  /** Format: text */
  "rowFilter.RecurringReminder.intervalUnit": string;
  /** Format: ARRAY */
  "rowFilter.RecurringReminder.specificUnit": string;
  /** Format: bigint */
  "rowFilter.RecurringReminder.billID": string;
}

export interface operations {}

export interface external {}
