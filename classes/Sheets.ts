import { create_sheet } from "@/actions/GoogleSheet";

export class Sheets {
  static instance: Sheets;

  private constructor() { }

  static get_instance() {
    if (!this.instance) {
      this.instance = new Sheets();
    }
    return this.instance;
  }

  async create_sheet(form_title: string) {
    console.log("Creating sheet for form: ", form_title);
    console.log(await create_sheet(form_title));
    console.log("Created sheet for form: ", form_title);
  }
}
