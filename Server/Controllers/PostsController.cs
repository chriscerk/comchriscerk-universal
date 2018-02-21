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
        var projectId = "";
        _firestore = FirestoreDb.Create(projectId);
    }

    [HttpGet]
    public async Task<IActionResult> Get(int currentPageNo = 1, int pageSize = 20)
    {
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
      else
      {
        return Ok(posts.OrderByDescending(u => u.EntryTime));
      }
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
