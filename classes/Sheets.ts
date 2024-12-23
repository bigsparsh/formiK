import { append_response, create_sheet } from "@/actions/GoogleSheet";
import { FormElement } from "@/app/form/create/page";
import { formResponseState } from "./FormResponseManager";

export class Sheets {
  static instance: Sheets;

  private constructor() { }

  static get_instance() {
    if (!this.instance) {
      this.instance = new Sheets();
    }
    return this.instance;
  }

  async create_sheet(
    form_title: string,
    form_id: string,
    form_fields: FormElement[],
  ) {
    create_sheet(form_title, form_id, form_fields);
  }

  async append_response(sheet_id: string, response_state: formResponseState[]) {
    append_response(
      sheet_id,
      response_state.filter((ele) => ele.option != null || ele.text),
    );
  }
}
