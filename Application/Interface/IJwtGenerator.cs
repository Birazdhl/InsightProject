using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interface
{
    public interface IJwtGenerator
    {
        string CreateToken(AppUser user);
    }
}
