import { defineType, defineField } from "sanity";

export const offer = defineType({
  name: "offer",
  title: "Offer",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "clientEmail",
      title: "Client Email",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "clientName",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eventDate",
      title: "Event Date",
      type: "string",
      description: "Display date e.g. '15 September 2026'",
    }),
    defineField({
      name: "eventLocation",
      title: "Event Location",
      type: "string",
    }),
    defineField({
      name: "packagePrices",
      title: "Package Prices",
      type: "object",
      fields: [
        defineField({
          name: "classic",
          title: "Classic Elegance",
          type: "number",
          validation: (rule) => rule.required().min(0),
        }),
        defineField({
          name: "refined",
          title: "Refined & Elevated",
          type: "number",
          validation: (rule) => rule.required().min(0),
        }),
        defineField({
          name: "ultimate",
          title: "Ultimate Luxury",
          type: "number",
          validation: (rule) => rule.required().min(0),
        }),
      ],
    }),
    defineField({
      name: "addonPrices",
      title: "Add-on Prices",
      type: "object",
      fields: [
        defineField({
          name: "extraHour",
          title: "Extra Hour of Coverage",
          type: "number",
          validation: (rule) => rule.min(0),
        }),
        defineField({
          name: "photographer",
          title: "Additional Photographer",
          type: "number",
          validation: (rule) => rule.min(0),
        }),
        defineField({
          name: "dayBeforeAfter",
          title: "Rehearsal & Day-After Session",
          type: "number",
          validation: (rule) => rule.min(0),
        }),
        defineField({
          name: "extraDay",
          title: "Additional Event Day",
          type: "number",
          validation: (rule) => rule.min(0),
        }),
        defineField({
          name: "album",
          title: "Fine-Art Wedding Album",
          type: "number",
          validation: (rule) => rule.min(0),
        }),
        defineField({
          name: "parentAlbums",
          title: "Parent Albums",
          type: "number",
          validation: (rule) => rule.min(0),
        }),
        defineField({
          name: "fullNda",
          title: "Complete Privacy Agreement (%)",
          type: "number",
          description: "Percentage cost added to package price",
          validation: (rule) => rule.min(0),
        }),
        defineField({
          name: "partialNda",
          title: "Partial Privacy Agreement (%)",
          type: "number",
          description: "Percentage cost added to package price",
          validation: (rule) => rule.min(0),
        }),
      ],
    }),
    defineField({
      name: "isExpired",
      title: "Expired",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Sent", value: "sent" },
          { title: "Accepted", value: "accepted" },
        ],
      },
      initialValue: "draft",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      readOnly: true,
    }),
  ],
  initialValue: () => ({
    createdAt: new Date().toISOString(),
    isExpired: false,
    status: "draft",
    packagePrices: {
      classic: 3000,
      refined: 4500,
      ultimate: 7000,
    },
    addonPrices: {
      extraHour: 300,
      photographer: 1000,
      dayBeforeAfter: 800,
      extraDay: 2000,
      album: 500,
      parentAlbums: 400,
      fullNda: 20,
      partialNda: 10,
    },
  }),
  preview: {
    select: {
      title: "clientName",
      subtitle: "eventDate",
      status: "status",
    },
    prepare({ title, subtitle, status }) {
      return {
        title: title || "Untitled Offer",
        subtitle: `${subtitle || "No date"} — ${status || "draft"}`,
      };
    },
  },
});
