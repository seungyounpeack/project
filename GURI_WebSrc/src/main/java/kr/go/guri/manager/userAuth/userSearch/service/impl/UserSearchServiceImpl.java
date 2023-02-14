package kr.go.guri.manager.userAuth.userSearch.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.manager.userAuth.userSearch.service.UserSearchService;
/**
 * 관리자 사용자 조회 serviceImpl 클래스
* @author 김부권
* @since 2022. 06. 21.
* @version 1.0
* @see
*
* <pre>
* << 개정이력(Modification Information) >>
*
*     수정일                         수정자                            수정내용
*  -----------       -------------   ----------------------
*  2022.06.21.           김부권                          최초 생성
*   
* </pre>
*/

@Service("userSearchService")
public class UserSearchServiceImpl implements UserSearchService{
	
	@Resource( name = "userSearchMapper")
	private UserSearchMapper usersearchMapper;
	
	/**
	 * 부서/직위별 권한 전 조회	
	 */
	@Override
	public List<Map<String, Object>> selectSearchList(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return usersearchMapper.selectSearchList(param);
	}
	/**
	 * 로딩시 부서 검색조건 가져오기
	 */
	@Override
	public List<Map<String, Object>> getDeptAllGetList() throws SQLException , IOException {
		// TODO Auto-generated method stub
		return usersearchMapper.getDeptAllGetList();
	}
	
	/**
	 * 로딩시 직위 검색조건 가져오기
	 */
	@Override
	public List<Map<String, Object>> getPositionList() throws SQLException , IOException {
		// TODO Auto-generated method stub
		return usersearchMapper.getPositionList();
	}
	
}
