using AspCoreServer.Models;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspCoreServer.Controllers
{
  [Route("api/[controller]")]
  public class PostsController : Controller
  {
    private FirestoreDb _firestore;
    public PostsController()
    {
        // NOTE: FirestoreDB.Create tries to access global environment variables
        string value = Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", EnvironmentVariableTarget.User);
        var projectId = "comchriscerk";
        _firestore = FirestoreDb.Create(projectId);
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      // http://googlecloudplatform.github.io/google-cloud-dotnet/docs/Google.Cloud.Firestore/datamodel.html
      CollectionReference collection = _firestore.Collection("posts");
      QuerySnapshot snapshot = await collection.SnapshotAsync();

      var posts = new List<Post>();

      foreach (DocumentSnapshot document in snapshot.Documents)
      {
          Post post = document.Deserialize<Post>();
          posts.Add(post);
      }

      if (!posts.Any())
      {
        return NotFound("Posts not Found");
      }

      return Ok(posts.OrderByDescending(u => u.EntryTime));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
      Post post = null;

      if (post == null)
      {
        return NotFound("Post not Found");
      }
      else
      {
        return Ok(post);
      }
    }
  }
}
