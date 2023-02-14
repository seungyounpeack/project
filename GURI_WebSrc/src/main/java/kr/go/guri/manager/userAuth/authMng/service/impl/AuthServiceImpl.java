/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package kr.go.guri.manager.userAuth.authMng.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.go.guri.manager.userAuth.authMng.service.AuthService;

/**
 * 관리자 > 권한 관리용 Service Implement 클래스
 * @author 김부권
 * @since 2021. 08. 25.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2021.08.25.   	김부권          최초 생성
 *   
 * </pre>
 */

@Service("authService")
public class AuthServiceImpl extends EgovAbstractServiceImpl implements AuthService {

	@Resource(name = "authMapper")
	private AuthMapper authMapper;

	/**
	 *  권한 목록 조회하기
	 */
	@Override
	public List<Map<String, Object>> selectAuthList(Map<String, Object> param) throws IOException, SQLException {
		return authMapper.selectAuthList(param);
	}

	
	/**
	 * 권한 목록 저장하기
	 */
	@Override
	public int insertAuthInfo(Map<String, Object> param) throws IOException, SQLException {
		return authMapper.insertAuthInfo(param);
	}
	
	
	/**
	 * 권한 정보 수정하기
	 */
	@Override
	public int updateAuthInfo(Map<String, Object> param) throws IOException, SQLException {
		return authMapper.updateAuthInfo(param);
	}
	
	
	/**
	 * 권한 정보 삭제하기
	 */
	@Override
	public int deleteAuthInfo(Map<String, Object> param) throws IOException, SQLException {
		return authMapper.deleteAuthInfo(param);
	}
	
	
	/**
	 * 권한 코드별 선택한 메뉴 목록 조회하기
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	@Override
	public List<Map<String, Object>> selectAuthMenuList(Map<String, Object> param) throws IOException, SQLException {
		return authMapper.selectAuthMenuList(param);
	}
	
	
	/**
	 * 권한별 메뉴 정보 저장하기
	 */
	@Override
	public int insertAuthMenuInfo(Map<String, Object> param) throws IOException, SQLException {
		return authMapper.insertAuthMenuInfo(param);
	}
	
	
	/**
	 * 권한별 메뉴 정보 삭제하기
	 */
	@Override
	public int deleteAuthMenuInfo(Map<String, Object> param) throws IOException, SQLException {
		return authMapper.deleteAuthMenuInfo(param);
	}
	
	
	
	
	
}
