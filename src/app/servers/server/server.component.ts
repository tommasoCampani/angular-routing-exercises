import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { ServersService } from "../servers.service";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"]
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const serverId = this.route.snapshot.params["id"];
    this.server = this.serversService.getServer(Number(serverId));

    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(Number(params["id"]));
    });
  }

  onEditServer() {
    //this.router.navigate(["/servers", this.server.id, "edit"]);

    //use of relative path
    this.router.navigate(["edit"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
      fragment: "loading"
    });
  }
}
